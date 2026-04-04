"use client"

import { useEffect, useRef, useState } from "react"

interface ChatMessage {
  type: "message" | "system" | "joined"
  name?: string
  text?: string
}

export default function ChatPage() {
  const [joined, setJoined] = useState(false)
  const [name, setName] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [users, setUsers] = useState<string[]>([])
  const [text, setText] = useState("")
  const wsRef = useRef<WebSocket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function connect(playerName: string) {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws"
    const ws = new WebSocket(`${protocol}://${window.location.host}/ws/chat`)
    wsRef.current = ws

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join", name: playerName }))
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as ChatMessage & { users?: string[] }

      if (data.type === "joined") {
        setJoined(true)
        setName(playerName)
      } else if ("users" in data && Array.isArray(data.users)) {
        setUsers(data.users as string[])
      } else {
        setMessages((prev) => [...prev, data])
      }
    }

    ws.onclose = () => {
      setMessages((prev) => [
        ...prev,
        { type: "system", text: "Rozłączono z serwerem." },
      ])
    }
  }

  function handleJoin(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = nameInput.trim()
    if (!trimmed) return
    connect(trimmed)
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim() || wsRef.current?.readyState !== WebSocket.OPEN) return
    wsRef.current.send(JSON.stringify({ type: "message", text }))
    setText("")
  }

  // ── Join Screen ──────────────────────────────────────────────────────────────
  if (!joined) {
    return (
      <main style={styles.center}>
        <div style={styles.joinBox}>
          <h1 style={styles.title}>💬 Chat</h1>
          <p style={styles.subtitle}>Podaj swoje imię, aby dołączyć</p>
          <form onSubmit={handleJoin} style={styles.form}>
            <input
              style={styles.input}
              type="text"
              placeholder="Twoje imię..."
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              maxLength={30}
              autoFocus
            />
            <button style={styles.btn} type="submit">
              Dołącz
            </button>
          </form>
        </div>
      </main>
    )
  }

  // ── Chat Screen ──────────────────────────────────────────────────────────────
  return (
    <main style={styles.chatLayout}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Uczestnicy ({users.length})</h2>
        <ul style={styles.userList}>
          {users.map((u) => (
            <li key={u} style={{ ...styles.userItem, fontWeight: u === name ? "bold" : "normal" }}>
              {u === name ? `${u} (Ty)` : u}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main chat */}
      <section style={styles.chatSection}>
        <header style={styles.chatHeader}>
          <span>Zalogowany jako: <strong>{name}</strong></span>
        </header>

        <div style={styles.messageList}>
          {messages.map((msg, i) => {
            if (msg.type === "system") {
              return (
                <div key={i} style={styles.systemMsg}>
                  — {msg.text}
                </div>
              )
            }
            const isMine = msg.name === name
            return (
              <div key={i} style={{ ...styles.msgRow, flexDirection: isMine ? "row-reverse" : "row" }}>
                <div style={{ ...styles.bubble, background: isMine ? "#4f46e5" : "#e5e7eb", color: isMine ? "#fff" : "#111" }}>
                  {!isMine && <span style={styles.msgName}>{msg.name}</span>}
                  <span>{msg.text}</span>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} style={styles.sendForm}>
          <input
            style={styles.input}
            type="text"
            placeholder="Wpisz wiadomość..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />
          <button style={styles.btn} type="submit">
            Wyślij
          </button>
        </form>
      </section>
    </main>
  )
}

// ── Inline styles ────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#f3f4f6",
  },
  joinBox: {
    background: "#fff",
    borderRadius: 12,
    padding: "2rem 2.5rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    minWidth: 320,
  },
  title: { margin: "0 0 0.25rem", fontSize: "1.75rem" },
  subtitle: { margin: "0 0 1.5rem", color: "#6b7280" },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  input: {
    padding: "0.6rem 0.9rem",
    fontSize: "1rem",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    outline: "none",
  },
  btn: {
    padding: "0.6rem 1.2rem",
    fontSize: "1rem",
    borderRadius: 8,
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
  },
  chatLayout: {
    display: "flex",
    height: "100vh",
    background: "#f9fafb",
  },
  sidebar: {
    width: 200,
    background: "#1e1b4b",
    color: "#e0e7ff",
    padding: "1rem",
    flexShrink: 0,
    overflowY: "auto",
  },
  sidebarTitle: { fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem", color: "#a5b4fc" },
  userList: { listStyle: "none", padding: 0, margin: 0 },
  userItem: { padding: "0.4rem 0", borderBottom: "1px solid rgba(255,255,255,0.07)", fontSize: "0.9rem" },
  chatSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  chatHeader: {
    padding: "0.75rem 1.25rem",
    borderBottom: "1px solid #e5e7eb",
    background: "#fff",
    fontSize: "0.9rem",
    color: "#374151",
  },
  messageList: {
    flex: 1,
    overflowY: "auto",
    padding: "1rem 1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  systemMsg: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: "0.8rem",
    fontStyle: "italic",
    margin: "0.25rem 0",
  },
  msgRow: { display: "flex", alignItems: "flex-end", gap: 8 },
  bubble: {
    maxWidth: "65%",
    padding: "0.5rem 0.85rem",
    borderRadius: 12,
    fontSize: "0.95rem",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    wordBreak: "break-word",
  },
  msgName: { fontSize: "0.7rem", fontWeight: "bold", marginBottom: 2, color: "#6b7280" },
  sendForm: {
    display: "flex",
    gap: 8,
    padding: "0.75rem 1.25rem",
    borderTop: "1px solid #e5e7eb",
    background: "#fff",
  },
}
