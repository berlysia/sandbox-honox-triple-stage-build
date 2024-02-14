import { builtinModules } from "module";
import { getEntryContent } from "./entry.js";
const defaultOptions = {
  entry: ["./src/index.tsx", "./app/server.ts"],
  outputDir: "./dist",
  external: [],
  minify: true,
  emptyOutDir: false
};
const cloudflarePagesPlugin = (options) => {
  const virtualEntryId = "virtual:cloudflare-pages-entry-module";
  const resolvedVirtualEntryId = "\0" + virtualEntryId;
  return {
    name: "@hono/vite-cloudflare-pages",
    resolveId(id) {
      if (id === virtualEntryId) {
        return resolvedVirtualEntryId;
      }
    },
    async load(id) {
      if (id === resolvedVirtualEntryId) {
        return await getEntryContent({
          entry: options?.entry ? Array.isArray(options.entry) ? options.entry : [options.entry] : [...defaultOptions.entry]
        });
      }
    },
    config: async () => {
      return {
        ssr: {
          external: options?.external ?? defaultOptions.external,
          noExternal: true
        },
        build: {
          outDir: options?.outputDir ?? defaultOptions.outputDir,
          emptyOutDir: options?.emptyOutDir ?? defaultOptions.emptyOutDir,
          minify: options?.minify ?? defaultOptions.minify,
          ssr: true,
          rollupOptions: {
            external: [...builtinModules, /^node:/],
            input: virtualEntryId,
            output: {
              entryFileNames: "_worker.js"
            }
          }
        }
      };
    }
  };
};
export {
  cloudflarePagesPlugin,
  defaultOptions
};
