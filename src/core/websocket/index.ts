import { Server as HttpServer } from "http"
import { Server as SocketIOServer, Socket } from "socket.io"

let io: SocketIOServer

// Map userId => socketId
const connectedUsers = new Map<number, string>()

export const initWebSocket = (server: HttpServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: "*", // Adjust for production
      methods: ["GET", "POST"],
    },
  })

  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id)

    // Register user
    socket.on("register", (userId: number) => {
      connectedUsers.set(userId, socket.id)
      console.log(`🔗 User ${userId} registered with socket ID ${socket.id}`)
    })

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id)

      const userEntry = [...connectedUsers.entries()].find(
        ([, sockId]) => sockId === socket.id,
      )

      if (userEntry) {
        const [userId] = userEntry
        connectedUsers.delete(userId)
        console.log(`🗑️ Removed user ${userId} from connected users`)
      }
    })
  })
}

// Trigger notification to a specific user
export const sendNotificationToUser = (userId: number, notification: any) => {
  const socketId = connectedUsers.get(userId)
  if (socketId && io) {
    io.to(socketId).emit("new_notification", notification)
    console.log(`Sent notification to user ${userId} via ${socketId}`)
  } else {
    console.warn(`⚠️ User ${userId} is not connected.`)
  }
}
