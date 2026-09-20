import type { ImageLoaderProps } from "next/image";

// daniellu.ca is on Cloudflare's Free plan, which doesn't have the
// /cdn-cgi/image/ resizing endpoint enabled — every request to it 404s.
// Serve the original file directly (no resize/reformat) until that's
// replaced with a Worker route backed by the Images binding.
export default function cloudflareLoader({ src }: ImageLoaderProps) {
  return src;
}
