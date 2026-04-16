import { WsChatMessageCommand } from "./WsChatMessageCommand"
import { WsChatCommandServer } from "./server"

export type WsChatCommandClient = WsChatMessageCommand | {
  type: "join"
  name: string
} | {
  type: "leave"
  name: string
}

export class ChatWsClient {
  private ws: WebSocket | null = null
  private handlers: ((command: WsChatCommandServer) => void)[] = []
  readonly name: string

  constructor(name: string, private readonly path: string = "ws://localhost:3000/ws/chat") {
    this.name = name
  }

  connect() {
    this.ws = new WebSocket(this.path)

    this.ws.onopen = () => {
      this.ws?.send(JSON.stringify({ type: "join", name: this.name }))
    }

    this.ws.onmessage = (event) => {
      const command = JSON.parse(event.data) as WsChatCommandServer
      this.handlers.forEach(handler => handler(command))
    }

    this.ws.onclose = () => {
      console.log("Disconnected from server.")
    }

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error)
    }
  }

  onMessage(handler: (command: WsChatCommandServer) => void) {
    if (this.handlers.includes(handler)) return false

    this.handlers.push(handler)
    return true
  }

  leave() {
    this.send({ type: "leave", name: this.name })
  }

  message(text: string) {
    this.send({ type: "message", text, name: this.name })
  }

  close(clearHandlers: boolean = false) {
    this.ws?.close()
    this.ws = null
    if (clearHandlers) this.handlers = []
  }

  private send(command: WsChatCommandClient) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open.")
      return
    }

    this.ws.send(JSON.stringify(command))
  }
}