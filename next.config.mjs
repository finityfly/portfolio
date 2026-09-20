/** @type {import('next').NextConfig} */
import { execSync } from "node:child_process";

const resolveLastUpdatedIso = () => {
  if (process.env.NEXT_PUBLIC_LAST_UPDATED) {
    return process.env.NEXT_PUBLIC_LAST_UPDATED;
  }

  try {
    const result = execSync("git log -1 --format=%cI", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();

    return result || new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
};

const lastUpdatedIso = resolveLastUpdatedIso();

// Vercel always sets VERCEL=1 during its own builds; Cloudflare's build
// doesn't. On Cloudflare, next/image routes through a custom loader that
// hits Cloudflare's Images binding instead of Vercel's optimizer.
const isVercel = Boolean(process.env.VERCEL);

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isVercel ? {} : { loader: "custom", loaderFile: "./image-loader.ts" }),
  },
  compress: true,
  env: {
    NEXT_PUBLIC_LAST_UPDATED: lastUpdatedIso,
  },
  // lib/corkboard.server.ts reads this directory with fs.readdir at request
  // time; Next's file tracer only follows static imports, so it never
  // bundles these on its own and the Workers deploy 500s without this.
  outputFileTracingIncludes: {
    "/**": ["./data/corkboard/entries/**"],
  },
};

export default nextConfig;
