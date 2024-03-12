import { createRequestHandler } from "@remix-run/express";
import { broadcastDevReady } from "@remix-run/node";
import express from "express";
import { createLightship } from "lightship";

// notice that the result of `remix build` is "just a module"
import * as build from "./build/index.js";

const app = express();
app.use(express.static("public"));

// and your app is "just a request handler"
app.all("*", createRequestHandler({ build }));

// Abstracts readiness, liveness and startup checks and graceful shutdown of Node.js services running in Kubernetes.
const lightship = await createLightship({
  port: process.env.K8S_PROBES_PORT || 3005,
  detectKubernetes: false, // We want to set a fixed port also in local development
});

const port = process.env.K8S_SERVER_PORT || 3000;
const server = app
  .listen(port, () => {
    if (process.env.NODE_ENV === "development") {
      broadcastDevReady(build);
    }
    console.log(`App listening on port: ${port}`);

    // Lightship default state is "SERVER_IS_NOT_READY". Therefore, you must signal
    // that the server is now ready to accept connections.
    lightship.signalReady();
  })
  .on("error", () => {
    lightship.shutdown();
  });

lightship.registerShutdownHandler(() => {
  server.close();
});
