"use client";

import { ContactShadows, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { modelUrl, pickMode, type Mode } from "./model";

/**
 * Sayfa komodosu: hero'daki komodo kadrajdan kaçtıktan sonra sağ kenarda belirir ve
 * sayfa aşağı kaydırıldıkça ekranın altına doğru koşar (konumu = sayfa ilerlemesi).
 * - Kaydırma hızı arttıkça daha hızlı koşar; yukarı kaydırınca döner ve yukarı koşar
 * - Hero ile aynı model dosyasını kullanır (önbellekten); sahne kopyalanır (clone)
 * - Yalnızca ≥1280px ekranlarda (daha dar ekranlarda içeriğin üzerine biner); "hareketi azalt" ve veri tasarrufunda hiç yüklenmez
 * - pointer-events: none — içeriğin önünü kesmez
 */

const BOX_W = 132;
const BOX_H = 250;
const TOP_MIN = 84;
const BOTTOM_GAP = 100; // WhatsApp butonuna yer bırak

type RunState = { velocity: number; dir: 1 | -1 };

function RunnerDragon({ url, run }: { url: string; run: React.RefObject<RunState> }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url, false, true);
  // Hero sahnesiyle aynı nesneyi paylaşmamak için kopya (geometri/malzeme paylaşılır)
  const model = useMemo(() => scene.clone(true), [scene]);
  const { actions, names } = useAnimations(animations, group);
  const action = useRef<THREE.AnimationAction | null>(null);
  const lastY = useRef(0);

  const { offset, scale } = useMemo(() => {
    model.updateMatrixWorld(true);
    const box = new THREE.Box3();
    model.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const b = new THREE.Box3().setFromBufferAttribute(mesh.geometry.attributes.position as THREE.BufferAttribute);
      box.union(b.applyMatrix4(mesh.matrixWorld));
    });
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    return { offset: new THREE.Vector3(-center.x, -box.min.y, -center.z), scale: 2.2 / Math.max(size.x, size.y, size.z) };
  }, [model]);

  useLayoutEffect(() => {
    model.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) mesh.frustumCulled = false;
    });
  }, [model]);

  useEffect(() => {
    const a = names[0] ? actions[names[0]] : undefined;
    if (!a) return;
    a.reset().setLoop(THREE.LoopRepeat, Infinity).play();
    action.current = a;
    lastY.current = window.scrollY;
    return () => {
      a.stop();
    };
  }, [actions, names]);

  useFrame(({ clock }, delta) => {
    const g = group.current;
    const r = run.current;
    if (!g || !r) return;
    // Kaydırma hızı (piksel/kare), yumuşatılmış
    const y = window.scrollY;
    const v = y - lastY.current;
    lastY.current = y;
    r.velocity = THREE.MathUtils.lerp(r.velocity, v, 0.18);
    if (Math.abs(r.velocity) > 0.6) r.dir = r.velocity > 0 ? 1 : -1;
    const speed = Math.min(1, Math.abs(r.velocity) / 22);

    // Baş +Z → ekranın altı (kamera üstten bakıyor). Yukarı kaydırınca 180° döner.
    const targetYaw = r.dir === 1 ? 0 : Math.PI;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetYaw, 7, delta);
    // Koşarken gövde salınımı ve hafif zıplama
    const t = clock.getElapsedTime();
    g.rotation.z = Math.sin(t * 16) * 0.06 * speed;
    g.position.y = Math.abs(Math.sin(t * 16)) * 0.06 * speed;
    if (action.current) action.current.timeScale = 0.6 + speed * 4.2;
  });

  return (
    <group ref={group} scale={scale}>
      <primitive object={model} position={offset} />
    </group>
  );
}

export function KomodoRunner() {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("pending");
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const run = useRef<RunState>({ velocity: 0, dir: 1 });
  const top = useMotionValue(TOP_MIN);
  const topSpring = useSpring(top, { stiffness: 90, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduce || !matchMedia("(min-width: 1280px)").matches) return;
    const md = pickMode();
    if (md === "fallback") return;
    setMode(md);
    setEnabled(true);

    const onScroll = () => {
      const start = window.innerHeight * 0.75;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight - start);
      const y = window.scrollY;
      setVisible(y > start);
      const p = Math.min(1, Math.max(0, (y - start) / max));
      top.set(TOP_MIN + p * (window.innerHeight - BOX_H - BOTTOM_GAP - TOP_MIN));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduce, top]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          aria-hidden
          className="no-print pointer-events-none fixed right-0 z-30 hidden xl:block"
          style={{ top: 0, y: topSpring, width: BOX_W, height: BOX_H }}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
        >
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 3.6, 2.4], fov: 34, near: 0.1, far: 30 }}
            gl={{ antialias: true, alpha: true }}
            onCreated={({ gl, camera }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.4;
              camera.lookAt(0, 0.2, 0);
            }}
          >
            <hemisphereLight args={["#ffe2bf", "#24180c", 0.9]} />
            <directionalLight position={[2, 4, 3]} intensity={2.6} color="#fff1dc" />
            <directionalLight position={[-3, 2, -2]} intensity={3.4} color="#FFC23D" />
            <directionalLight position={[3, 1.5, -3]} intensity={2.4} color="#F7931E" />
            <Suspense fallback={null}>
              <RunnerDragon url={modelUrl(mode)} run={run} />
              <ContactShadows position={[0, 0.001, 0]} opacity={0.5} scale={4} blur={2.4} far={1} resolution={256} color="#000000" />
            </Suspense>
          </Canvas>
        </m.div>
      )}
    </AnimatePresence>
  );
}
