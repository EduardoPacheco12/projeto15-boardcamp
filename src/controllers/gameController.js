import connection from "../dbStrategy/postgres.js";

export async function getGames(req, res) {
    let { name } = req.query;
    if(name) {
        name = name.toLowerCase();
        const { rows: game } = await connection.query(`
            SELECT games.*, categories.name as "categoryName" 
            FROM games
            JOIN categories 
            ON games."categoryId" = categories.id
            WHERE lower(games.name) LIKE $1
        `, [name + "%"]);

        return res.send(game);
    }

    try {
        const { rows: games } = await connection.query(`
            SELECT games.*, categories.name as "categoryName" 
            FROM games
            JOIN categories 
            ON games."categoryId" = categories.id
        `);
        
        res.send(games);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function postGame(req, res) {
    try {
        const game = req.body;
        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)', [game.name, game.image, game.stockTotal, game.categoryId, game.pricePerDay]);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}