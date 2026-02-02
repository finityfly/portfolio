declare module "lenis/react" {
  import { ComponentType, ReactNode } from "react";
  export const ReactLenis: ComponentType<{
    root?: boolean | "asChild";
    options?: Record<string, unknown>;
    children?: ReactNode;
  }>;
}
