import { buildApp } from "./app.js";

async function start() {
  try {
    const app = buildApp();

    await app.listen({
      port: 3000,
      host: "0.0.0.0",
    });

    console.log("🚀 Auth Service Started");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();