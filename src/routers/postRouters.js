import { Router } from "express";
import { postCategory } from "../controllers/categoryController.js";
import { postGame } from "../controllers/gameController.js";
import { validatePostCategory } from "../middlewares/categoryMiddleware.js";
import { validatePostGame } from "../middlewares/gameMiddleware.js";

const router = Router();

router.post("/categories", validatePostCategory , postCategory);
router.post("/games", validatePostGame, postGame);

export default router;