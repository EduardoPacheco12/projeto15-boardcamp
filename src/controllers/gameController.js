import connection from "../dbStrategy/postgres.js";

export async function postGame(req, res) {
    try {
        const game = req.body;
        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)', [game.name, game.image, game.stockTotal, game.categoryId, game.pricePerDay]);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}