/// <reference types="vite/client" />

declare module "*.md" {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_UNSTATIC_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
