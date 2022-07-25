import customerSchema from "../schemas/customerSchema.js";
import connection from "../dbStrategy/postgres.js";

export async function validateCustomer(req, res, next) {
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

export async function validateUpdateCustomer(req, res, next) {
    const customer = req.body;
    const { id } = req.params;
    
    const { error } = customerSchema.validate(customer, { abortEarly: false });
    if (error) {
        return res.sendStatus(400);
    }

    const { rows: verifyCustomer } = await connection.query('SELECT * FROM customers WHERE cpf = $1 and id != $2', [customer.cpf, id]);
    if(verifyCustomer[0]) {
        return res.sendStatus(409);
    }
    
    next();
}