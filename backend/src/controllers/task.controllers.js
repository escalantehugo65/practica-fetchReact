import { TaskModel } from "../models/task.model.js";
const validTask = (body) => body && typeof body.title === "string" && body.title.trim().length > 0 && body.title.length <= 100 && typeof body.description === "string" && body.description.length <= 100 && (body.is_completed === undefined || typeof body.is_completed === "boolean");
export const getAllTasksByUserId = async (req, res) => res.json(await TaskModel.findAll({ where: { user_id: req.user.id } }));
export const getAllTasks = getAllTasksByUserId;
export const createTask = async (req, res) => {
  if (!validTask(req.body)) return res.status(400).json({ message: "Título obligatorio y textos hasta 100 caracteres; is_completed debe ser booleano" });
  const { title, description, is_completed = false } = req.body;
  return res.status(201).json(await TaskModel.create({ title: title.trim(), description, is_completed, user_id: req.user.id }));
};
export const updateTask = async (req, res) => {
  const task = await TaskModel.findOne({ where: { id: req.params.id, user_id: req.user.id } });
  if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
  const merged = { title: task.title, description: task.description, is_completed: task.is_completed, ...req.body };
  if (!validTask(merged)) return res.status(400).json({ message: "Datos de tarea inválidos" });
  await task.update({ title: merged.title.trim(), description: merged.description, is_completed: merged.is_completed });
  return res.json(task);
};
export const deleteTask = async (req, res) => {
  const task = await TaskModel.findOne({ where: { id: req.params.id, user_id: req.user.id } });
  if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
  await task.destroy();
  return res.json({ message: "Tarea eliminada correctamente" });
};
