import { createServer } from "http"
import { parse } from "url"
import next from "next"
import { WebSocketServer, WebSocket } from "ws"

const dev = process.env.NODE_ENV !== "production"
const hostname = "localhost"
const port = parseInt(process.env.PORT ?? "3000", 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

interface Client {
  ws: WebSocket
  name: string
}

const clients = new Map<WebSocket, Client>()

function broadcast(data: object, exclude?: WebSocket) {
  const msg = JSON.stringify(data)
  for (const [ws] of clients) {
    if (ws !== exclude && ws.readyState === WebSocket.OPEN) {
      ws.send(msg)
    }
  }
}

function broadcastAll(data: object) {
  const msg = JSON.stringify(data)
  for (const [ws] of clients) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(msg)
    }
  }
}

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url ?? "/", true)
    handle(req, res, parsedUrl)
  })

  const wss = new WebSocketServer({ server: httpServer, path: "/ws/chat" })

  wss.on("connection", (ws) => {
    // Not registered yet — wait for a 'join' message
    ws.on("message", (raw) => {
      let data: { type: string; text?: string; name?: string }
      try {
        data = JSON.parse(raw.toString())
      } catch {
        return
      }

      const client = clients.get(ws)

      if (!client) {
        // Only 'join' is valid before registration
        if (data.type === "join" && data.name?.trim()) {
          const name = data.name.trim()
          clients.set(ws, { ws, name })

          // Confirm to the joining client
          ws.send(JSON.stringify({ type: "joined", name }))

          // Notify everyone else
          broadcast({ type: "system", text: `${name} dołączył(a) do chatu` }, ws)

          // Send current user list
          const userList = Array.from(clients.values()).map((c) => c.name)
          broadcastAll({ type: "users", users: userList })
        }
        return
      }

      if (data.type === "message" && data.text?.trim()) {
        broadcastAll({
          type: "message",
          name: client.name,
          text: data.text.trim(),
        })
      }
    })

    ws.on("close", () => {
      const client = clients.get(ws)
      if (client) {
        clients.delete(ws)
        broadcast({ type: "system", text: `${client.name} opuścił(a) chat` })
        const userList = Array.from(clients.values()).map((c) => c.name)
        broadcastAll({ type: "users", users: userList })
      }
    })
  })

  httpServer.listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
