import { Router } from "express";
import { deleteRental } from "../controllers/rentalController.js";
import { validateDeleteRental } from "../middlewares/rentalMiddleware.js";

const router = Router();

router.delete("/rentals/:id", validateDeleteRental, deleteRental);

export default router;