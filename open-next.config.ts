import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No ISR/revalidate anywhere in this app (everything's getStaticProps with
// fallback: false), so no incremental cache (R2 bucket) is needed here.
const config = defineCloudflareConfig();

export default {
  ...config,
  cloudflare: {
    ...config.cloudflare,
    // Chakra/Emotion's "workerd" export condition points at a .cjs.mjs file
    // that Next's file tracer fails to copy into the server bundle (a known
    // tracing gap for that double-extension filename). The plain
    // browser/default condition works fine for these packages.
    useWorkerdCondition: false,
  },
};
