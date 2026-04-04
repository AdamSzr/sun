import { Server } from "http"
import { WebSocket, WebSocketServer } from "ws"
import { WsChatMessageCommand } from "./commands"
import { WsChatCommandClient } from "./client"

export type WsChatCommandServer = WsChatMessageCommand | {
  type: "joined"
  userName: string
} | {
  type: "left"
  userName: string
}

type Client = {
  ws: WebSocket
  userName: string
}

export const clients = new Map<WebSocket, Client>()

const chat = {
  broadcast(data: WsChatCommandServer, exclude?: WebSocket) {
    clients.forEach((client) => {
      if (client.ws !== exclude && client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(JSON.stringify(data))
      }
    })
  },
  message: (text: string, name: string) => chat.broadcast({ type: "message", text, userName: name }),
  joined: (name: string) => chat.broadcast({ type: "joined", userName: name }),
  left: (name: string) => chat.broadcast({ type: "left", userName: name }),
}

export const chatWsServer = (httpServer: Server, wsPath: string) => {
  const wss = new WebSocketServer({ server: httpServer, path: wsPath })

  wss.on("connection", (ws) => {
    ws.on("message", (raw) => {
      const command: WsChatCommandClient = JSON.parse(raw.toString())

      const client = clients.get(ws)

      if (!client && command.type !== "join") return

      if (command.type === "join") {
        const userName = command.userName.trim()
        clients.set(ws, { ws, userName })

        chat.joined(userName)
      }

      if (command.type === "message") {
        chat.message(command.text, command.userName)
      }

      if (command.type === "leave") {
        clients.delete(ws)
        chat.left(command.userName)
      }
    })

    ws.on("close", () => {
      const client = clients.get(ws)
      if (!client) return

      clients.delete(ws)
      chat.left(client.userName)
    })
  })

  return wss
}