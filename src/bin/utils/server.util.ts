const PORT = process.env.PORT || "5000"
export function normalizePort(val: any) {
  const port = parseInt(val, 10)

  if (Number.isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

export function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error
  }

  const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case "EADDRINUSE":
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

export function onListening(server: any) {
  const addr = server.address()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`
}
