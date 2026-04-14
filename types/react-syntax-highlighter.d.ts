declare module "react-syntax-highlighter/dist/cjs/light" {
  import { ComponentType } from "react";
  const SyntaxHighlighter: ComponentType<Record<string, unknown>> & {
    registerLanguage: (name: string, language: unknown) => void;
  };
  export default SyntaxHighlighter;
}

declare module "react-syntax-highlighter/dist/cjs/languages/hljs/javascript" {
  const language: unknown;
  export default language;
}
declare module "react-syntax-highlighter/dist/cjs/languages/hljs/typescript" {
  const language: unknown;
  export default language;
}
declare module "react-syntax-highlighter/dist/cjs/languages/hljs/bash" {
  const language: unknown;
  export default language;
}
declare module "react-syntax-highlighter/dist/cjs/languages/hljs/json" {
  const language: unknown;
  export default language;
}
declare module "react-syntax-highlighter/dist/cjs/languages/hljs/python" {
  const language: unknown;
  export default language;
}
declare module "react-syntax-highlighter/dist/cjs/languages/hljs/cpp" {
  const language: unknown;
  export default language;
}
declare module "react-syntax-highlighter/dist/cjs/languages/hljs/c" {
  const language: unknown;
  export default language;
}

declare module "react-syntax-highlighter/dist/cjs/styles/hljs" {
  const styles: Record<string, Record<string, unknown>>;
  export const atomOneDark: Record<string, unknown>;
  export const atomOneLight: Record<string, unknown>;
  export default styles;
}
