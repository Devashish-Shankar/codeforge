import Fastify from "fastify";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.get("/", async () => {
    return {
      message: "🚀 Welcome to CodeForge Auth Service",
    };
  });

  return app;
}