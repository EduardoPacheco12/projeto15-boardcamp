import { Router } from "express";
import { getCategories } from "../controllers/categoryController.js";
import { getCustomer, getCustomers } from "../controllers/customer.Controller.js";
import { getGames } from "../controllers/gameController.js";

const router = Router();

router.get("/categories", getCategories);
router.get("/games", getGames);
router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomer);

export default router;