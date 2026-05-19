import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service.js";
import type { CreateUserInput } from "../validations/user.validation.js";

export const userController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // El body ya fue validado por el middleware — podemos confiar en el tipo
      const input = req.body as CreateUserInput;

      const user = await userService.create(input);

      res.status(201).json({
        status: "success",
        message: "Usuario creado correctamente",
        data: user,
      });
    } catch (error) {
      // Pasa el error al middleware de errores global
      next(error);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.findAll();
      res.json({ status: "success", data: users });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string, 10);

      if (isNaN(id)) {
        res.status(400).json({ status: "error", message: "ID inválido" });
        return;
      }

      const user = await userService.findById(id);
      res.json({ status: "success", data: user });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      const { user, accessToken } = await userService.login({
        email,
        password,
      });

      res.json({
        status: "success",
        message: "Login exitoso",
        data: {
          user,
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
