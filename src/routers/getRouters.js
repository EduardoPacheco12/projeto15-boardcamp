import { Router } from "express";
import { getCategories } from "../controllers/categoryController.js";
import { getGames } from "../controllers/gameController.js";

const router = Router();

router.get("/categories", getCategories);
router.get("/games", getGames);

export default router;