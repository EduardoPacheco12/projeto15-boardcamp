import gameSchema from "../schemas/gameSchema.js";
import connection from "../dbStrategy/postgres.js";

export async function validatePostGame(req, res, next) {
    const game = req.body;

    const { error } = gameSchema.validate(game, { abortEarly: false });
    const { rows: verifyCategory } = await connection.query('SELECT * FROM categories WHERE id = $1', [game.categoryId]);
    if (error || !verifyCategory[0]) {
        return res.sendStatus(400);
    }

    const { rows: verifyGame } = await connection.query('SELECT * FROM games WHERE name = $1', [game.name]);
    if(verifyGame[0]) {
        return res.sendStatus(409);
    }
    
    next();
}