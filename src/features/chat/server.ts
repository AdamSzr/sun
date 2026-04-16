import { Server } from "http"
import { WebSocket, WebSocketServer } from "ws"
import { WsChatMessageCommand } from "./WsChatMessageCommand"
import { WsChatCommandClient } from "./client"

export type WsChatCommandServer = WsChatMessageCommand | {
  type: "joined"
  name: string
} | {
  type: "left"
  name: string
}

type Client = {
  ws: WebSocket
  name: string
}

export const clients = new Map<WebSocket, Client>()

const chat = {
  broadcast(data: WsChatCommandServer) {
    clients.forEach((client) => {
      if (client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(JSON.stringify(data))
      }
    })
  },
  message: (text: string, name: string) => chat.broadcast({ type: "message", text, name }),
  joined: (name: string) => chat.broadcast({ type: "joined", name }),
  left: (name: string) => chat.broadcast({ type: "left", name }),
}

export const chatWsServer = (httpServer: Server, wsPath: string) => {
  const wss = new WebSocketServer({ server: httpServer, path: wsPath })

  wss.on("connection", (ws) => {
    ws.on("message", (raw) => {
      const command: WsChatCommandClient = JSON.parse(raw.toString())

      const client = clients.get(ws)

      if (!client && command.type !== "join") return

      if (command.type === "join") {
        const name = command.name.trim()
        clients.set(ws, { ws, name })

        chat.joined(name)
      }

      if (command.type === "message") {
        chat.message(command.text, command.name)
      }

      if (command.type === "leave") {
        clients.delete(ws)
        chat.left(command.name)
      }
    })

    ws.on("close", () => {
      const client = clients.get(ws)
      if (!client) return

      clients.delete(ws)
      chat.left(client.name)
    })
  })

  return wss
}