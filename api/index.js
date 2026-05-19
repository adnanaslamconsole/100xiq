/**
 * Vercel Serverless Function for TanStack Start SSR
 * This handler serves as the entry point for all requests and routes them
 * through the TanStack Start server for server-side rendering.
 */

let serverHandler;

async function loadServerHandler() {
  if (serverHandler) return serverHandler;

  try {
    // The dist/server directory is included in the build
    // We import the server handler that was built by Vite
    const module = await import("../dist/server/index.js");
    serverHandler = module.default || module;
    console.log("Server handler loaded successfully");
  } catch (error) {
    console.error("Failed to load server handler:", error);
    throw new Error("Server handler initialization failed");
  }

  return serverHandler;
}

function buildRequestUrl(req) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const path = req.url || "/";
  return new URL(path, `${protocol}://${host}`).toString();
}

function convertHeaders(vercelHeaders) {
  const headers = new Headers();
  Object.entries(vercelHeaders).forEach(([key, value]) => {
    if (typeof value === "string") {
      headers.set(key, value);
    } else if (Array.isArray(value)) {
      headers.set(key, value[0]);
    }
  });
  return headers;
}

async function handler(req, res) {
  try {
    const handler = await loadServerHandler();

    if (!handler?.fetch) {
      console.error("Server handler has no fetch method");
      return res.status(503).json({
        error: "Service Unavailable",
        message: "Server handler not properly initialized",
      });
    }

    // Build the request object
    const url = buildRequestUrl(req);
    const headers = convertHeaders(req.headers);

    let body;
    if (req.method !== "GET" && req.method !== "HEAD" && req.body) {
      if (typeof req.body === "string") {
        body = req.body;
      } else if (typeof req.body === "object") {
        body = JSON.stringify(req.body);
      }
    }

    // Create Fetch API Request
    const fetchRequest = new Request(url, {
      method: req.method || "GET",
      headers,
      body,
    });

    // Call the server handler
    const fetchResponse = await handler.fetch(fetchRequest, {}, {});

    // Set response status
    res.status(fetchResponse.status);

    // Copy headers
    fetchResponse.headers.forEach((value, key) => {
      // Skip problematic headers
      if (!["content-encoding", "transfer-encoding"].includes(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });

    // Send body
    const arrayBuffer = await fetchResponse.arrayBuffer();
    if (arrayBuffer.byteLength > 0) {
      res.send(Buffer.from(arrayBuffer));
    } else {
      res.end();
    }
  } catch (error) {
    console.error("Serverless handler error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error occurred",
      timestamp: new Date().toISOString(),
    });
  }
}

export default handler;
