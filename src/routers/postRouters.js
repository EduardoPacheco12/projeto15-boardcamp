import { Router } from "express";
import { postCategory } from "../controllers/categoryController.js";
import { postCustomer } from "../controllers/customer.Controller.js";
import { postGame } from "../controllers/gameController.js";
import { finishRental, postRental } from "../controllers/rentalController.js";
import { validateCategory } from "../middlewares/categoryMiddleware.js";
import { validateCustomer } from "../middlewares/customerMiddleware.js";
import { validateGame } from "../middlewares/gameMiddleware.js";
import { validateFinishRental, validateRental } from "../middlewares/rentalMiddleware.js";

const router = Router();

router.post("/categories", validateCategory , postCategory);
router.post("/games", validateGame, postGame);
router.post("/customers", validateCustomer, postCustomer);
router.post("/rentals", validateRental, postRental);
router.post("/rentals/:id/return", validateFinishRental, finishRental);

export default router;