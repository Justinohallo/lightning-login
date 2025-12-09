import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { WebSocketServer } from "ws";
import { subscribeToK1 } from "./src/lib/websocket/authStatusServer";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    const { pathname, query } = parse(request.url!, true);

    if (pathname === "/api/ws/auth") {
      wss.handleUpgrade(request, socket, head, (ws: import("ws").WebSocket) => {
        const k1 = query.k1 as string;
        if (k1) {
          subscribeToK1(k1, ws);
          ws.send(JSON.stringify({ type: "connected", k1 }));
        } else {
          ws.close(1008, "Missing k1 parameter");
        }
      });
    } else {
      socket.destroy();
    }
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});

