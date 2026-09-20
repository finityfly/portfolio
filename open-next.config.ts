import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No ISR/revalidate anywhere in this app (everything's getStaticProps with
// fallback: false), so no incremental cache (R2 bucket) is needed here.
export default defineCloudflareConfig();
