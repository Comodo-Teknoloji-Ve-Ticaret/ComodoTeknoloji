"use client";

import { ContactShadows, Grid, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Hero 3D sahnesi: nöbetteki komodo ejderi.
 * - Model: public/models/komodo(.lite).glb (scripts/optimize-komodo.mjs ile sıkıştırıldı, meshopt + WebP)
 * - Modelin kendi 8 sn'lik bekleme animasyonu döngüde oynar
 * - Gövde boyunca altın sarısı tarama halkası geçer (CCTV/NOC motifi)
 * - İmleç ile hafif dönüş; fareyle sürükleyerek çevirme (ataletli)
 * - Sayfa aşağı kaydırıldıkça baktığı yöne doğru hızla koşup kadrajın kenarından çıkar (geri kaydırınca döner)
 * - Tıklayınca ağzından ateş püskürtür ve tarama halkası hemen geçer
 * Kaynak model: "Komodo Dragon Lizard" — Nyilonelycompany (Sketchfab Standard lisans)
 */

export type KomodoSceneProps = {
  url: string;
  lite: boolean;
  reduceMotion: boolean;
  active: boolean;
  pointer: React.RefObject<{ x: number; y: number }>;
  scroll: React.RefObject<number>;
  /** Sürükleme durumu: offset (radyan), velocity (radyan/kare), dragging */
  drag: React.RefObject<{ offset: number; velocity: number; dragging: boolean }>;
  /** Her artışta ateş püskürtme + manuel tarama tetiklenir */
  scanSignal: number;
};

/** Ateşin çıktığı nokta: burun ucundaki vertex (animasyonla birlikte her karede yeniden okunur) */
type Mouth = { mesh: THREE.Mesh; index: number; group: THREE.Group };

// Model dünya koordinatlarında ~2.7 birim uzun; baş +Z, kuyruk -Z yönünde
const BASE_YAW = -Math.PI / 2 + 0.55; // başı sola (metne doğru) ve hafif kameraya çevir

function Dragon({ url, reduceMotion, pointer, scroll, drag, scanSignal, mouth }: Omit<KomodoSceneProps, "lite" | "active"> & { mouth: React.RefObject<Mouth | null> }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url, false, true);
  const { actions, names } = useAnimations(animations, group);
  const actionRef = useRef<THREE.AnimationAction | null>(null);

  // Modeli ortala, zemine oturt, boyunu normalize et.
  // Box3.setFromObject morph hedeflerinin uç değerlerini de katıp kutuyu şişirdiği için
  // sınırlar yalnızca temel pozun vertex'lerinden hesaplanır.
  // Aynı geçişte burun ucu (en büyük Z) vertex'i de bulunur.
  const { offset, scale, snout } = useMemo(() => {
    scene.updateMatrixWorld(true);
    const box = new THREE.Box3();
    const v = new THREE.Vector3();
    let snout: { mesh: THREE.Mesh; index: number; z: number } | null = null;
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const pos = mesh.geometry.attributes.position as THREE.BufferAttribute;
      const b = new THREE.Box3().setFromBufferAttribute(pos);
      box.union(b.applyMatrix4(mesh.matrixWorld));
      for (let i = 0; i < pos.count; i++) {
        const z = v.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld).z;
        if (!snout || z > snout.z) snout = { mesh, index: i, z };
      }
    });
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const s = 2.4 / Math.max(size.x, size.y, size.z);
    return { offset: new THREE.Vector3(-center.x, -box.min.y, -center.z), scale: s, snout: snout as { mesh: THREE.Mesh; index: number } | null };
  }, [scene]);

  useEffect(() => {
    if (!snout || !group.current) return;
    mouth.current = { mesh: snout.mesh, index: snout.index, group: group.current };
    return () => {
      mouth.current = null;
    };
  }, [snout, mouth]);

  useLayoutEffect(() => {
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = false;
      mesh.frustumCulled = false; // morph animasyonu sınır kutusunun dışına taşabilir
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat?.isMeshStandardMaterial) {
        mat.roughness = 0.62;
        mat.metalness = 0.05;
        mat.envMapIntensity = 0;
      }
    });
  }, [scene]);

  useEffect(() => {
    const action = names[0] ? actions[names[0]] : undefined;
    if (!action) return;
    action.reset().setLoop(THREE.LoopRepeat, Infinity);
    action.play();
    actionRef.current = action;
    action.paused = reduceMotion;
    return () => {
      action.stop();
    };
  }, [actions, names, reduceMotion]);

  // Ateş püskürtürken başını kameraya doğru çevirir (alev kadrajda kalsın)
  const fireUntil = useRef(0);
  useEffect(() => {
    if (scanSignal > 0) fireUntil.current = performance.now() + FIRE_DURATION * 1000 + 250;
  }, [scanSignal]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g || reduceMotion) return;
    const p = pointer.current ?? { x: 0, y: 0 };
    const s = scroll.current ?? 0;
    const d = drag.current;
    // Bırakıldıktan sonra atalet: hız giderek söner
    if (d && !d.dragging && Math.abs(d.velocity) > 0.0001) {
      d.offset += d.velocity;
      d.velocity *= 0.93;
    }
    // Kaçış: kaydırma ilerledikçe (s: 0→1) baktığı yöne doğru hızla kadraj dışına koşar
    const run = Math.pow(Math.min(1, s * 1.15), 1.5);
    const fireTurn = performance.now() < fireUntil.current ? 0.6 * (1 - run) : 0;
    const targetYaw = BASE_YAW + p.x * 0.35 * (1 - run) + (d?.offset ?? 0) + fireTurn;
    const targetPitch = -p.y * 0.06 * (1 - run);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetYaw, d?.dragging ? 14 : 4, delta);
    const dist = run * 6.5;
    g.position.x = THREE.MathUtils.damp(g.position.x, Math.sin(g.rotation.y) * dist, 9, delta);
    g.position.z = THREE.MathUtils.damp(g.position.z, Math.cos(g.rotation.y) * dist, 9, delta);
    // Koşarken hafif zıplama ve hızlanan beden hareketi
    g.position.y = run > 0.02 ? Math.abs(Math.sin(performance.now() / 70)) * 0.04 * Math.min(1, run * 4) : THREE.MathUtils.damp(g.position.y, 0, 8, delta);
    if (actionRef.current) actionRef.current.timeScale = 1 + run * 3.5;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetPitch, 3, delta);
  });

  return (
    <group ref={group} rotation={[0, BASE_YAW, 0]} scale={scale}>
      <primitive object={scene} position={offset} />
      {/* Model koordinatlarında: halka gövde ekseni (Z) boyunca kayar, ejderle birlikte döner */}
      <ScanRing reduceMotion={reduceMotion} signal={scanSignal} />
    </group>
  );
}

/** Gövde boyunca geçen tarama halkası: 6 sn'de bir otomatik, tıklamayla anında */
function ScanRing({ reduceMotion, signal }: { reduceMotion: boolean; signal: number }) {
  const ring = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const manual = useRef<{ pending: boolean; start: number }>({ pending: false, start: -10 });

  useEffect(() => {
    if (signal > 0) manual.current.pending = true;
  }, [signal]);

  useFrame(({ clock }) => {
    if (!ring.current || !mat.current) return;
    const t = clock.getElapsedTime();
    if (manual.current.pending) {
      manual.current = { pending: false, start: t };
    }
    const sinceManual = t - manual.current.start;
    const cycle = sinceManual < 2.2 ? sinceManual : t % 6;
    const k = cycle < 2 ? cycle / 2 : 1;
    const eased = 1 - Math.pow(1 - k, 3);
    ring.current.position.z = THREE.MathUtils.lerp(1.55, -1.55, eased);
    mat.current.opacity = cycle < 2 ? Math.sin(k * Math.PI) * (sinceManual < 2.2 ? 1 : 0.85) : 0;
  });
  if (reduceMotion) return null;
  return (
    <mesh ref={ring} position={[0, 0.26, 0]}>
      <torusGeometry args={[0.46, 0.008, 8, 96]} />
      <meshBasicMaterial ref={mat} color="#FFC23D" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

const FIRE_VERTEX = /* glsl */ `
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;
uniform float uScale;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vColor = aColor;
  vAlpha = aAlpha;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * uScale / -mv.z;
  gl_Position = projectionMatrix * mv;
}`;

const FIRE_FRAGMENT = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main() {
  float a = smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5));
  gl_FragColor = vec4(vColor, a * a * vAlpha);
}`;

// Alev rengi yaşa göre: beyaz-sarı çekirdek → marka altını → turuncu → koyu kırmızı
const FIRE_RAMP: [number, number, number, number][] = [
  [0, 1, 0.96, 0.78],
  [0.15, 1, 0.76, 0.24],
  [0.5, 0.97, 0.45, 0.07],
  [1, 0.55, 0.08, 0.02],
];
const FIRE_DURATION = 1.1;

/** Tıklamayla ağızdan püsküren alev: dünya uzayında parçacıklar + ağızda titreyen ışık */
function FireBreath({ mouth, signal, lite }: { mouth: React.RefObject<Mouth | null>; signal: number; lite: boolean }) {
  const count = lite ? 140 : 260;
  const light = useRef<THREE.PointLight>(null);
  const pending = useRef(false);
  const { size, viewport, camera } = useThree();

  const sim = useMemo(
    () => ({
      pos: new Float32Array(count * 3),
      vel: new Float32Array(count * 3),
      color: new Float32Array(count * 3),
      size: new Float32Array(count),
      alpha: new Float32Array(count),
      age: new Float32Array(count).fill(1),
      life: new Float32Array(count).fill(1),
      next: 0,
      carry: 0,
      emitUntil: -1,
      origin: new THREE.Vector3(),
      dir: new THREE.Vector3(),
      quat: new THREE.Quaternion(),
      toCam: new THREE.Vector3(),
    }),
    [count],
  );
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(sim.pos, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(sim.color, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(sim.size, 1));
    g.setAttribute("aAlpha", new THREE.BufferAttribute(sim.alpha, 1));
    return g;
  }, [sim]);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uScale: { value: 1 } },
        vertexShader: FIRE_VERTEX,
        fragmentShader: FIRE_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );
  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  useEffect(() => {
    if (signal > 0) pending.current = true;
  }, [signal]);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 1 / 30);
    const t = clock.getElapsedTime();
    const m = mouth.current;
    if (pending.current) {
      pending.current = false;
      sim.emitUntil = t + FIRE_DURATION;
    }
    const emitting = !!m && t < sim.emitUntil;
    if (m) {
      m.mesh.getVertexPosition(m.index, sim.origin).applyMatrix4(m.mesh.matrixWorld);
      // Başın baktığı yön, hafif aşağı eğik ve biraz kameraya dönük (alev kadrajda kalsın)
      sim.dir.set(0, -0.12, 1).applyQuaternion(m.group.getWorldQuaternion(sim.quat)).normalize();
      sim.toCam.copy(camera.position).sub(sim.origin).normalize();
      sim.dir.addScaledVector(sim.toCam, 0.6).normalize();
    }
    if (emitting) {
      sim.carry += dt * (count / 0.75);
      for (; sim.carry >= 1; sim.carry--) {
        const i = sim.next;
        sim.next = (i + 1) % count;
        const speed = 1.5 + Math.random() * 0.9;
        const vx = sim.dir.x + (Math.random() - 0.5) * 0.55;
        const vy = sim.dir.y + (Math.random() - 0.5) * 0.55;
        const vz = sim.dir.z + (Math.random() - 0.5) * 0.55;
        const len = Math.hypot(vx, vy, vz);
        sim.vel[i * 3] = (vx / len) * speed;
        sim.vel[i * 3 + 1] = (vy / len) * speed;
        sim.vel[i * 3 + 2] = (vz / len) * speed;
        sim.pos[i * 3] = sim.origin.x;
        sim.pos[i * 3 + 1] = sim.origin.y;
        sim.pos[i * 3 + 2] = sim.origin.z;
        sim.age[i] = 0;
        sim.life[i] = 0.55 + Math.random() * 0.4;
      }
    }
    const drag = Math.exp(-1.8 * dt);
    for (let i = 0; i < count; i++) {
      if (sim.age[i] >= sim.life[i]) {
        sim.alpha[i] = 0;
        continue;
      }
      sim.age[i] += dt;
      const k = Math.min(1, sim.age[i] / sim.life[i]);
      sim.vel[i * 3] *= drag;
      sim.vel[i * 3 + 1] = sim.vel[i * 3 + 1] * drag + 1.1 * dt; // sıcak hava yükselir
      sim.vel[i * 3 + 2] *= drag;
      sim.pos[i * 3] += sim.vel[i * 3] * dt;
      sim.pos[i * 3 + 1] += sim.vel[i * 3 + 1] * dt;
      sim.pos[i * 3 + 2] += sim.vel[i * 3 + 2] * dt;
      sim.size[i] = 0.07 + 0.5 * Math.sqrt(k);
      sim.alpha[i] = Math.pow(1 - k, 1.3) * Math.min(1, sim.age[i] * 25) * 0.45;
      let s = 1;
      while (s < FIRE_RAMP.length - 1 && FIRE_RAMP[s][0] < k) s++;
      const [k0, r0, g0, b0] = FIRE_RAMP[s - 1];
      const [k1, r1, g1, b1] = FIRE_RAMP[s];
      const f = (k - k0) / (k1 - k0);
      sim.color[i * 3] = r0 + (r1 - r0) * f;
      sim.color[i * 3 + 1] = g0 + (g1 - g0) * f;
      sim.color[i * 3 + 2] = b0 + (b1 - b0) * f;
    }
    for (const name of ["position", "aColor", "aSize", "aAlpha"]) geometry.attributes[name].needsUpdate = true;

    const fov = (camera as THREE.PerspectiveCamera).fov ?? 30;
    material.uniforms.uScale.value = (size.height * viewport.dpr * 0.5) / Math.tan(THREE.MathUtils.degToRad(fov) / 2);

    if (light.current) {
      const flicker = emitting ? 8 + Math.sin(t * 47) * 1.2 + Math.random() * 1.5 : 0;
      light.current.intensity = THREE.MathUtils.damp(light.current.intensity, flicker, emitting ? 18 : 6, dt);
      light.current.position.copy(sim.origin).addScaledVector(sim.dir, 0.35);
    }
  });

  return (
    <>
      <points geometry={geometry} material={material} frustumCulled={false} />
      <pointLight ref={light} intensity={0} color="#ff8a2a" distance={3} decay={1.5} />
    </>
  );
}

function Rig({ pointer, reduceMotion }: { pointer: KomodoSceneProps["pointer"]; reduceMotion: boolean }) {
  const look = useMemo(() => new THREE.Vector3(0, 0.28, 0), []);
  useFrame(({ camera }, delta) => {
    const p = pointer.current ?? { x: 0, y: 0 };
    const tx = reduceMotion ? 0 : p.x * 0.25;
    const ty = reduceMotion ? 0 : p.y * 0.12;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, tx, 2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 1.35 + ty, 2, delta);
    camera.lookAt(look);
  });
  return null;
}

export default function KomodoScene({ url, lite, reduceMotion, active, pointer, scroll, drag, scanSignal }: KomodoSceneProps) {
  const mouth = useRef<Mouth | null>(null);
  return (
    <Canvas
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      frameloop={!active ? "never" : reduceMotion ? "demand" : "always"}
      camera={{ position: [0, 1.35, 3.9], fov: 30, near: 0.1, far: 50 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.45;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
      aria-hidden
    >
      {/* Marka ışıklandırması: sıcak ana ışık + turuncu/altın kenar ışıkları */}
      <hemisphereLight args={["#ffe2bf", "#24180c", 0.85]} />
      <directionalLight position={[2.5, 3.5, 3]} intensity={2.8} color="#fff1dc" />
      <directionalLight position={[-3, 1.6, -2.5]} intensity={4.2} color="#FFC23D" />
      <directionalLight position={[3, 1.2, -3]} intensity={3.4} color="#F7931E" />
      <pointLight position={[0, 0.25, 1.4]} intensity={0.8} color="#F5A524" distance={3} />

      <Suspense fallback={null}>
        <Dragon url={url} reduceMotion={reduceMotion} pointer={pointer} scroll={scroll} drag={drag} scanSignal={scanSignal} mouth={mouth} />
        {!reduceMotion && <FireBreath mouth={mouth} signal={scanSignal} lite={lite} />}
        <ContactShadows position={[0, 0.001, 0]} opacity={0.55} scale={5} blur={2.6} far={1.2} resolution={lite ? 256 : 512} frames={reduceMotion ? 1 : Infinity} color="#000000" />
      </Suspense>

      <Grid
        position={[0, 0, 0]}
        args={[12, 12]}
        cellSize={0.25}
        cellThickness={0.6}
        cellColor="#5c3a14"
        sectionSize={1}
        sectionThickness={1}
        sectionColor="#F7931E"
        fadeDistance={8}
        fadeStrength={1.6}
        infiniteGrid
      />
      <Rig pointer={pointer} reduceMotion={reduceMotion} />
    </Canvas>
  );
}
