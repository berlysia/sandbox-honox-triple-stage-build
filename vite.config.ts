import pages from "@hono/vite-cloudflare-pages";
import ssg from "@hono/vite-ssg";
import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";

const entry = "app/server.ts";

export default defineConfig(({ mode }) => {
  // Triple stage build: client, ssg, worker

  if (mode === "client") {
    // Client build
    return {
      plugins: [client()],
      build: {
        outDir: ".hono",
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
      plugins: [honox(), ssg({ entry })],
    };
  }
});
