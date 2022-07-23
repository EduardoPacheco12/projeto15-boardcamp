import connection from "../dbStrategy/postgres.js";

export async function getCategories(req, res) {
    try {
        const { rows: categories } = await connection.query('SELECT * FROM categories');
        
        res.send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function postCategory(req, res) {
    try {
        const category = req.body;
        await connection.query('INSERT INTO categories (name) VALUES ($1)', [category.name]);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}