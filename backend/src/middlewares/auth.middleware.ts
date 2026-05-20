import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
  userId: number;
  email: string;
};

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    // Verificar header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        status: "error",
        message: "Token requerido",
      });
      return;
    }

    // Extraer token
    const token = authHeader.split(" ")[1];

    // Verificar token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    // Guardar usuario en request
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: "Token inválido o expirado",
    });
  }
}
