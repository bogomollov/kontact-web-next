"use client";

export default function imageLoader({ src }: { src: string }) {
  return `http://localhost:3001${src}`;
}
