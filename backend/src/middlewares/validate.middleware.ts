import { Request, Response, NextFunction } from "express";
import z from "zod";
import { ZodSchema, ZodError } from "zod/v3";

export function validate(schema: z.ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Valida { body, params, query } según lo que el schema defina
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Formatea los errores en un array legible
        const errors = error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));
        res.status(400).json({
          status: "error",
          message: "Datos inválidos",
          errors,
        });
        return;
      }
      next(error);
    }
  };
}
