import { WsChatMessageCommand } from "./commands"

const commands = {
  message: (text: string, userName: string): WsChatMessageCommand => ({ type: "message", text, userName }),
  join: (userName: string): WsChatCommandClient => ({ type: "join", userName }),
  leave: (userName: string): WsChatCommandClient => ({ type: "leave", userName }),
}

export type WsChatCommandClient = WsChatMessageCommand | {
  type: "join"
  userName: string
} | {
  type: "leave"
  userName: string
}

const getWs = (path: string = "ws://localhost:3000/ws/chat") => {
  const ws = new WebSocket(path)



  ws.onopen = () => {
    ws.send(JSON.stringify({ type: "join", name: playerName }))
  }

  ws.onmessage = (event) => {
    const command = JSON.parse(event.data) as WsChatCommandClient

    if (command.type === "joined") {
      setJoined(true)
      setName(playerName)
    } else if ("users" in command && Array.isArray(command.users)) {
      setUsers(command.users as string[])
    } else {
      setMessages((prev) => [...prev, command])
    }
  }

  ws.onclose = () => {
    setMessages((prev) => [
      ...prev,
      { type: "system", text: "Rozłączono z serwerem." },
    ])
  }

  return {
    open: () => ws.send(JSON.stringify({ type: "join", name: playerName })),
    
  }
}


export const chat = {
  join: (name: string) => { },
  joined: (name: string) => { },
  leave: (name: string) => { },
  left: (name: string) => { },
  message: (text: string, userName: string) => { },
}

// ws.onopen = () => {
//   ws.send(JSON.stringify({ type: "join", name: playerName }))
// }

// ws.onmessage = (event) => {
//   const command = JSON.parse(event.data) as WsChatCommandClient

//   if (command.type === "joined") {
//     setJoined(true)
//     setName(playerName)
//   } else if ("users" in command && Array.isArray(command.users)) {
//     setUsers(command.users as string[])
//   } else {
//     setMessages((prev) => [...prev, command])
//   }
// }

// ws.onclose = () => {
//   setMessages((prev) => [
//     ...prev,
//     { type: "system", text: "Rozłączono z serwerem." },
//   ])
// }