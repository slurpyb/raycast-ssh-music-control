// @raycast/eslint-config ships without type declarations.
declare module "@raycast/eslint-config" {
  const config: Array<import("eslint/config").Config>;
  export default config;
}
