import { Router } from "express";
import { postCategory } from "../controllers/categoryController.js";
import { postCustomer } from "../controllers/customer.Controller.js";
import { postGame } from "../controllers/gameController.js";
import { validatePostCategory } from "../middlewares/categoryMiddleware.js";
import { validatePostCustomer } from "../middlewares/customerMiddleware.js";
import { validatePostGame } from "../middlewares/gameMiddleware.js";

const router = Router();

router.post("/categories", validatePostCategory , postCategory);
router.post("/games", validatePostGame, postGame);
router.post("/customers", validatePostCustomer, postCustomer);

export default router;