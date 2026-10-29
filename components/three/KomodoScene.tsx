"use client";

import { ContactShadows, Grid, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Hero 3D sahnesi: nöbetteki komodo ejderi.
 * - Model: public/models/komodo(.lite).glb (scripts/optimize-komodo.mjs ile sıkıştırıldı, meshopt + WebP)
 * - Modelin kendi 8 sn'lik bekleme animasyonu döngüde oynar
 * - Gövde boyunca altın sarısı tarama halkası geçer (CCTV/NOC motifi)
 * - İmleç ile hafif dönüş; fareyle sürükleyerek çevirme (ataletli)
 * - Sayfa aşağı kaydırıldıkça baktığı yöne doğru hızla koşup kadrajın kenarından çıkar (geri kaydırınca döner)
 * - Tıklayınca tarama halkası hemen geçer
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
  /** Her artışta manuel tarama tetiklenir */
  scanSignal: number;
};

// Model dünya koordinatlarında ~2.7 birim uzun; baş +Z, kuyruk -Z yönünde
const BASE_YAW = -Math.PI / 2 + 0.55; // başı sola (metne doğru) ve hafif kameraya çevir

function Dragon({ url, reduceMotion, pointer, scroll, drag, scanSignal }: Omit<KomodoSceneProps, "lite" | "active">) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url, false, true);
  const { actions, names } = useAnimations(animations, group);
  const actionRef = useRef<THREE.AnimationAction | null>(null);

  // Modeli ortala, zemine oturt, boyunu normalize et.
  // Box3.setFromObject morph hedeflerinin uç değerlerini de katıp kutuyu şişirdiği için
  // sınırlar yalnızca temel pozun vertex'lerinden hesaplanır.
  const { offset, scale } = useMemo(() => {
    scene.updateMatrixWorld(true);
    const box = new THREE.Box3();
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const b = new THREE.Box3().setFromBufferAttribute(mesh.geometry.attributes.position as THREE.BufferAttribute);
      box.union(b.applyMatrix4(mesh.matrixWorld));
    });
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const s = 2.4 / Math.max(size.x, size.y, size.z);
    return { offset: new THREE.Vector3(-center.x, -box.min.y, -center.z), scale: s };
  }, [scene]);

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
    const targetYaw = BASE_YAW + p.x * 0.35 * (1 - run) + (d?.offset ?? 0);
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
        <Dragon url={url} reduceMotion={reduceMotion} pointer={pointer} scroll={scroll} drag={drag} scanSignal={scanSignal} />
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
