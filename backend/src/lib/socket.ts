import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { env } from "../config/env.js";

let io: Server | null = null;

export function initSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("qr:join", (payload: { eventId?: number }) => {
      if (!payload?.eventId) return;
      socket.join(`event:${payload.eventId}:qr`);
    });

    socket.on("qr:leave", (payload: { eventId?: number }) => {
      if (!payload?.eventId) return;
      socket.leave(`event:${payload.eventId}:qr`);
    });
  });

  return io;
}

export function getIo() {
  if (!io) {
    throw new Error("Socket.io no inicializado");
  }

  return io;
}
