import { verifyToken } from "../helpers/jwt.helper.js";
export const authMiddleware = (req, res, next) => {
  try {
    const decoded = verifyToken(req.cookies.token);
    req.user = { id: decoded.id, name: decoded.name, lastname: decoded.lastname };
    next();
  } catch {
    return res.status(401).json({ message: "No autenticado o sesión vencida" });
  }
};
