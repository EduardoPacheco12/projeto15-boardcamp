import { Router } from "express";
import { putCustomer } from "../controllers/customer.Controller.js";
import { validateUpdateCustomer } from "../middlewares/customerMiddleware.js";

const router = Router();

router.put("/customers/:id", validateUpdateCustomer, putCustomer);

export default router;