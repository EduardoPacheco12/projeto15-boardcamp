import connection from "../dbStrategy/postgres.js";

export async function getCustomers(req, res) {
    let { cpf } = req.query;

    if(cpf) {
        const { rows: customer } = await connection.query('SELECT *, birthday::VARCHAR FROM customers WHERE cpf LIKE $1',[cpf + "%"]);

        return res.send(customer);
    }

    try {
        const { rows: customers } = await connection.query('SELECT *, birthday::VARCHAR FROM customers');
        res.send(customers);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getCustomer(req, res) {
    const { id } = req.params;

    try {
        const { rows: customer } = await connection.query('SELECT * FROM customers WHERE id = $1', [id])
        if(!customer[0]) {
            return res.sendStatus(404);
        }
        
        res.send(customer);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function postCustomer(req, res) {
    const customer = req.body;
    try {
        await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)', [customer.name, customer.phone, customer.cpf, customer.birthday]);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}