import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";
import { sequelize } from "../config/database.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
export const login = async (req, res) => {
  const { username, password } = req.body || {};
  if (typeof username !== "string" || typeof password !== "string" || !username.trim() || !password)
    return res.status(400).json({ message: "Usuario y contraseña son obligatorios" });
  const user = await UserModel.findOne({ where: { username: username.trim() }, include: { model: PersonModel, as: "person" } });
  if (!user || !(await comparePassword(password, user.password)))
    return res.status(401).json({ message: "Credenciales inválidas" });
  const token = generateToken({ id: user.id, name: user.person.name, lastname: user.person.lastname });
  res.cookie("token", token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 1000 * 60 * 60 * 5 });
  return res.json({ message: "Login exitoso" });
};
export const register = async (req, res) => {
  const { name, lastname, username, email, password } = req.body || {};
  if ([name, lastname, username, email, password].some(v => typeof v !== "string" || !v.trim()))
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  if ([name, lastname, username, email].some(v => v.length > 100) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 6 || Buffer.byteLength(password, "utf8") > 72)
    return res.status(400).json({ message: "Revisá los campos: email válido, textos hasta 100 caracteres y contraseña de al menos 6 caracteres y hasta 72 bytes" });
  try {
    const hashedPassword = await hashPassword(password);
    await sequelize.transaction(async transaction => {
      const person = await PersonModel.create({ name: name.trim(), lastname: lastname.trim() }, { transaction });
      await UserModel.create({ username: username.trim(), email: email.trim(), password: hashedPassword, person_id: person.id }, { transaction });
    });
    return res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") return res.status(409).json({ message: "Usuario o email ya registrado" });
    throw error;
  }
};
export const profile = (req, res) => res.json({ user: req.user });
export const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax", path: "/" });
  return res.json({ message: "Logout exitoso" });
};
