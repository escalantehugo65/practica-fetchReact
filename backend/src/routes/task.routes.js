import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getAllTasksByUserId,
  updateTask,
} from "../controllers/task.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const taskRouter = Router();

taskRouter.get("/tasks", authMiddleware, getAllTasks);
taskRouter.get("/tasks-by-user", authMiddleware, getAllTasksByUserId);
taskRouter.post("/tasks", authMiddleware, createTask);
taskRouter.put("/tasks/:id", authMiddleware, updateTask);
taskRouter.delete("/tasks/:id", authMiddleware, deleteTask);
