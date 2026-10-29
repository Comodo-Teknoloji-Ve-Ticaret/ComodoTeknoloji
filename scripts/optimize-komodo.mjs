/**
 * Komodo ejderi 3D modelini web için optimize eder.
 *
 *   node scripts/optimize-komodo.mjs <kaynak-klasör> [çıktı.glb] [--step=3] [--tex=2048] [--no-target-normals]
 *
 * Sitede kullanılan iki sürüm:
 *   public/models/komodo.glb       --step=3 --tex=2048 --no-target-normals  (masaüstü)
 *   public/models/komodo-lite.glb  --step=6 --tex=1024 --no-target-normals  (mobil / veri tasarrufu)
 *
 * Kaynak model (Sketchfab "Komodo Dragon Lizard", Nyilonelycompany, Sketchfab Standard lisans)
 * 190 morph target'lı, 24 fps "vertex-baked" bir yürüme animasyonu içerir: her anahtar karede
 * tek bir target'ın ağırlığı 1'dir. Her N. target'ı tutup aralarını doğrusal karıştırarak
 * animasyonu korur, ardından dokuyu WebP'ye çevirir ve meshopt ile sıkıştırırız.
 */
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { dedup, meshopt, prune, textureCompress } from "@gltf-transform/functions";
import { MeshoptEncoder } from "meshoptimizer";
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const args = process.argv.slice(2);
const src = args.find((a) => !a.startsWith("--"));
const out = args.filter((a) => !a.startsWith("--"))[1] ?? "public/models/komodo.glb";
const STEP = Number(args.find((a) => a.startsWith("--step="))?.split("=")[1] ?? 3);
const TEX = Number(args.find((a) => a.startsWith("--tex="))?.split("=")[1] ?? 2048);
const DROP_TARGET_NORMALS = args.includes("--no-target-normals");
if (!src) {
  console.error("Kullanım: node scripts/optimize-komodo.mjs <kaynak-klasör> [çıktı.glb] [--step=3]");
  process.exit(1);
}

await MeshoptEncoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ "meshopt.encoder": MeshoptEncoder });
const doc = await io.read(path.join(src, "scene.gltf"));
const root = doc.getRoot();

const mesh = root.listMeshes()[0];
const prim = mesh.listPrimitives()[0];
const targets = prim.listTargets();
const anim = root.listAnimations()[0];
const sampler = anim.listSamplers()[0];
const times = sampler.getInput().getArray();
const T = targets.length;

// 1) Tutulacak target'lar: her STEP karede bir
const keep = targets.map((_, i) => i).filter((i) => i % STEP === 0);
for (let i = 0; i < T; i++) {
  if (keep.includes(i)) continue;
  const t = targets[i];
  prim.removeTarget(t);
  for (const a of t.listAttributes()) a.dispose();
  t.dispose();
}
if (DROP_TARGET_NORMALS) {
  for (const t of prim.listTargets()) {
    const n = t.getAttribute("NORMAL");
    if (n) {
      t.setAttribute("NORMAL", null);
      n.dispose();
    }
  }
}
mesh.setWeights(new Array(keep.length).fill(0));

// 2) Animasyonu yeniden kur: target i, anahtar kare i+1'in zamanına denk gelir.
//    Başta ve sonda temel poz (tüm ağırlıklar 0) korunur, döngü kesintisiz kapanır.
const K = keep.length;
const keyTimes = [times[0], ...keep.map((i) => times[i + 1]), times[times.length - 1]];
const weights = new Float32Array(keyTimes.length * K);
keep.forEach((_, j) => (weights[(j + 1) * K + j] = 1));
sampler.getInput().setArray(new Float32Array(keyTimes));
sampler.getOutput().setArray(weights);
sampler.setInterpolation("LINEAR");

// 3) Doku → WebP 2048px, 4) temizlik, 5) quantize + meshopt sıkıştırma
await doc.transform(
  textureCompress({ encoder: sharp, targetFormat: "webp", resize: [TEX, TEX], quality: 82 }),
  dedup(),
  prune(),
  meshopt({ encoder: MeshoptEncoder, level: "medium" }),
);

fs.mkdirSync(path.dirname(out), { recursive: true });
await io.write(out, doc);
const mb = (fs.statSync(out).size / 1024 / 1024).toFixed(2);
console.log(`✓ ${out} — ${K}/${T} morph target, ${keyTimes.length} anahtar kare, ${mb} MB`);
