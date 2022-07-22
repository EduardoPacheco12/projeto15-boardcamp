import { Router } from "express";
import { postCategories } from "../controllers/categoryController.js";
import { validatePostCategory } from "../middlewares/categoryMiddleware.js";

const router = Router();

router.post("/categories", validatePostCategory ,postCategories);

export default router;