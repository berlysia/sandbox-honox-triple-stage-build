import pages from "@hono/vite-cloudflare-pages";
import ssg from "@hono/vite-ssg";
import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const entry = "app/server.ts";

export default defineConfig(({ mode }) => {
  // Triple stage build: client, ssg, worker

  if (mode === "client") {
    // Client build
    return {
      plugins: [client()],
      build: {
        emptyOutDir: true,
      },
    };
  }

  if (mode === "worker") {
    // Worker build
    return {
      plugins: [honox(), pages()],
    };
  }

  {
    // SSG build
    return {
      plugins: [
        honox(),
        ssg({ entry }),
        {
          name: "hono/vite-ssg/tweaks",
          config() {
            return {
              build: {
                emptyOutDir: false,
                assetsDir: "static",
                rollupOptions: {
                  output: {
                    assetFileNames: "static/[name].[ext]",
                    chunkFileNames: "static/[name].js",
                  },
                },
              },
            };
          },
        },
      ],
      resolve: {
        alias: [
          { find: /#/, replacement: "/app/" },
          {
            find: /^\/static\/(.*?)\.js/,
            replacement: resolve(
              // Node 18 support
              dirname(fileURLToPath(import.meta.url)),
              "dist/static/$1.js",
            ),
          },
        ],
      },
    };
  }
});
