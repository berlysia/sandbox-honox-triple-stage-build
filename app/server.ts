import { showRoutes } from "hono/dev";
import { createApp } from "honox/server";

const app = createApp({
  /*
   Only the routes that we want to return dynamic responses to the worker need to be bundled.
   But a bundled file will contain all the routes, because `import.meta.glob` is hard coded in honox/server ...
   */
  ROUTES:
    import.meta.env.MODE === "worker"
      ? import.meta.glob("/app/routes/api/**/[!_]*.ts", {
          eager: true,
        })
      : undefined,
});

showRoutes(app);

export default app;
