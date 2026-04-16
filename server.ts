
import { chatWsServer } from "./src/features/chat/server"
import { createServer } from "http"
import next from "next"
import { parse } from "url"

const dev = process.env.NODE_ENV !== "production"
const hostname = "0.0.0.0"
const port = parseInt(process.env.PORT ?? "3000", 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()


app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url ?? "/", true)
    handle(req, res, parsedUrl)
  })

  chatWsServer(httpServer, "/ws/chat")

  httpServer.listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
