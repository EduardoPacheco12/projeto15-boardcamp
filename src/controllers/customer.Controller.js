import connection from "../dbStrategy/postgres.js";


export async function postCustomer(req, res) {
    try {
        const customer = req.body;
        await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)', [customer.name, customer.phone, customer.cpf, customer.birthday]);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}