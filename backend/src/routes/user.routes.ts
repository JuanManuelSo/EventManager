import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createUserSchema } from "../validations/user.validation.js";

const router = Router();

// POST /api/users
// validate(schema) corre primero — si falla, nunca llega al controller
router.post("/", validate(createUserSchema), userController.create);
router.get("/", userController.getAll);
router.get("/:id", userController.getById);

router.post("/login", userController.login);

export default router;
