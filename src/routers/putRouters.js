import { Router } from "express";
import { putCustomer } from "../controllers/customer.Controller.js";
import { validateCustomer } from "../middlewares/customerMiddleware.js";

const router = Router();

router.put("/customers/:id", validateCustomer, putCustomer);

export default router;