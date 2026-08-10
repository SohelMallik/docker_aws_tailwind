
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Required for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

// Serve frontend dashboard
app.use(express.static(path.join(__dirname, "public")));

// HTTP server
const httpServer = createServer(app);

// Socket.IO
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Y-Socket.IO
const ySocketIO = new YSocketIO(io);
ySocketIO.initialize();

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        message: "ok",
        success: true
    });
});

// Start server
httpServer.listen(3000, "0.0.0.0", () => {
    console.log("Server is running on port 3000");
});

