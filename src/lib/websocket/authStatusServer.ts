import { WebSocket } from "ws";

type WebSocketClient = {
  ws: WebSocket;
  k1: string;
};

const clients = new Map<string, Set<WebSocketClient>>();

export function subscribeToK1(k1: string, ws: WebSocket): void {
  if (!clients.has(k1)) {
    clients.set(k1, new Set());
  }
  clients.get(k1)!.add({ ws, k1 });

  ws.on("close", () => {
    const k1Clients = clients.get(k1);
    if (k1Clients) {
      for (const client of k1Clients) {
        if (client.ws === ws) {
          k1Clients.delete(client);
          break;
        }
      }
      if (k1Clients.size === 0) {
        clients.delete(k1);
      }
    }
  });
}

export function broadcastAuthSuccess(k1: string, pubkey: string): void {
  const k1Clients = clients.get(k1);
  if (!k1Clients) {
    return;
  }

  const message = JSON.stringify({
    type: "authenticated",
    k1,
    pubkey,
  });

  for (const client of k1Clients) {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(message);
    }
  }
}

export function broadcastAuthError(k1: string, error: string): void {
  const k1Clients = clients.get(k1);
  if (!k1Clients) {
    return;
  }

  const message = JSON.stringify({
    type: "error",
    k1,
    error,
  });

  for (const client of k1Clients) {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(message);
    }
  }
}

