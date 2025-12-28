import path from 'path'
import https from 'https'
import http from 'http'
import fs from 'fs'

export type LogLevel = `debug` | `info` | `warn` | `error`;

export type LogEntry = {
  level: LogLevel
  message: string
  timestamp: string
  meta?: unknown
}

export type HttpConfig = {
  url: string
  headers?: Record<string, string>
}

export type LoggerConfig = {
  minLevel?: LogLevel
  logToConsole?: boolean
  logToFile?: string
  logToHttp?: HttpConfig
}

const colors = {
  reset: `\x1b[0m`,
  gray: `\x1b[90m`,
  green: `\x1b[32m`,
  yellow: `\x1b[33m`,
  red: `\x1b[31m`,
}

export class Logger {
  private levelPriority: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  }

  constructor( private config:LoggerConfig = {} ) {
    if (this.config.logToFile) {
      fs.mkdirSync( path.dirname( this.config.logToFile ), { recursive: true } )
    }
  }

  private canLog( level:LogLevel ): boolean {
    const min = this.config.minLevel ?? `debug`
    return this.levelPriority[ level ] >= this.levelPriority[ min ]
  }

  private colorize( level:LogLevel, text:string ): string {
    const color =
      level === `debug`
        ? colors.gray
        : level === `info`
          ? colors.green
          : level === `warn`
            ? colors.yellow
            : colors.red

    return `${color}${text}${colors.reset}`
  }

  private consoleLog( entry:LogEntry ): void {
    if (this.config.logToConsole === false) return

    const line = `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`
    const colored = this.colorize( entry.level, line )

    console[ entry.level ]( colored, entry.meta ?? `` )
  }

  private fileLog( entry:LogEntry ): void {
    if (!this.config.logToFile) return
    fs.appendFile(
      this.config.logToFile,
      JSON.stringify( entry ) + `\n`,
      () => {},
    )
  }

  private httpLog( entry:LogEntry ): void {
    if (!this.config.logToHttp) return

    const data = JSON.stringify( entry )
    const url = new URL( this.config.logToHttp.url )
    const client = url.protocol === `https:` ? https : http

    const req = client.request(
      {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
          'Content-Length': Buffer.byteLength( data ),
          ...(this.config.logToHttp.headers ?? {}),
        },
      },
      () => {},
    )

    req.on( `error`, () => {} )
    req.write( data )
    req.end()
  }

  private log( level:LogLevel, message:string, meta?:unknown ): void {
    if (!this.canLog( level )) return

    const entry:LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      meta,
    }

    this.consoleLog( entry )
    this.fileLog( entry )
    this.httpLog( entry )
  }

  debug( msg:string, meta?:unknown ) {
    this.log( `debug`, msg, meta )
  }

  info( msg:string, meta?:unknown ) {
    this.log( `info`, msg, meta )
  }

  warn( msg:string, meta?:unknown ) {
    this.log( `warn`, msg, meta )
  }

  error( msg:string, meta?:unknown ) {
    this.log( `error`, msg, meta )
  }
}
