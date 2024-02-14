import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  const name = c.req.query("name") ?? "world";
  return c.json({
    "your name is": name,
  });
});

export default app;
