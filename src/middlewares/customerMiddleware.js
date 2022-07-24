import customerSchema from "../schemas/customerSchema.js";
import connection from "../dbStrategy/postgres.js";

export async function validatePostCustomer(req, res, next) {
    const customer = req.body;
    const { error } = customerSchema.validate(customer, { abortEarly: false });
    if (error) {
        return res.sendStatus(400);
    }

    const { rows: verifyCustomer } = await connection.query('SELECT * FROM customers WHERE cpf = $1', [customer.cpf]);
    if(verifyCustomer[0]) {
        return res.sendStatus(409);
    }
    
    next();
}