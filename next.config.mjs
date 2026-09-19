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

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig = {
  ...(isStaticExport ? { output: "export" } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isStaticExport ? { unoptimized: true } : {}),
  },
  compress: true,
  env: {
    NEXT_PUBLIC_LAST_UPDATED: lastUpdatedIso,
  },
};

export default nextConfig;