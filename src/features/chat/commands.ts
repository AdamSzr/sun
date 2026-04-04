import { Server } from "http"
import { WebSocket, WebSocketServer } from "ws"

export type WsChatMessageCommand = {
  type: "message"
  userName: string
  text: string
}


// const commands = {
//   message: (text: string, name: string): WsChatMessageCommand => ({ type: "message", text, userName: name }),
//   join: (name: string): WsChatCommandClient => ({ type: "join", name }),
//   joined: (name: string): WsChatCommandServer => ({ type: "joined", name }),
//   leave: (name: string): WsChatCommandClient => ({ type: "leave", name }),
//   left: (name: string): WsChatCommandServer => ({ type: "left", name }),
// }

// const chat = {
//   server: {
//     send: (ws: WebSocket, command: WsChatCommandServer) => ws.send(JSON.stringify(command))
//   },
//   client: {
//     send: (ws: WebSocket, command: WsChatCommandClient) => ws.send(JSON.stringify(command))
//   }
// }

// export default chat