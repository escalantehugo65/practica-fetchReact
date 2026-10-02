import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { startDB } from "./src/config/database.js";
import { authRouter } from "./src/routes/auth.routes.js";
import { taskRouter } from "./src/routes/task.routes.js";
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRouter);
app.use("/api", taskRouter);
app.use((err, req, res, next) => {
  console.error(err.message);
  const status = err.status || 500;
  res.status(status).json({ message: status === 400 ? "JSON inválido" : "Error interno del servidor" });
});
try {
  if (!process.env.JWT_SECRET) throw new Error("Falta JWT_SECRET en .env");
  await startDB();
  app.listen(process.env.PORT || 3000, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT || 3000}`));
} catch (err) {
  console.error("No se pudo iniciar:", err.message);
  process.exitCode = 1;
}
