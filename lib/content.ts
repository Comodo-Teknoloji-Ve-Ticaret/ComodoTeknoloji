import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Faq } from "@/data/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type Author = {
  name: string;
  jobTitle?: string;
  certifications?: string[];
  linkedin?: string;
  knowsAbout?: string[];
};

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  draft: boolean;
  author: Author;
  faqs: Faq[];
  tags: string[];
  /** data/sources.ts içindeki kaynak id'leri */
  sources: string[];
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated ?? data.date,
    draft: !!data.draft,
    author: data.author ?? { name: "[DOLDURULACAK: yazar]" },
    faqs: data.faqs ?? [],
    tags: data.tags ?? [],
    sources: data.sources ?? [],
    readingMinutes: Math.max(1, Math.round(words / 200)),
    content,
  };
}

/** Taslaklar (draft: true) yalnızca geliştirme ortamında listelenir */
export function getAllPosts({ includeDrafts = process.env.NODE_ENV !== "production" } = {}): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readPost)
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  return getAllPosts().find((p) => p.slug === slug);
}

export const publishedPosts = () => getAllPosts({ includeDrafts: false });
