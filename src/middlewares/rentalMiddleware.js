import rentalSchema from "../schemas/rentalSchema.js";
import connection from "../dbStrategy/postgres.js";

export async function validateRental(req, res, next) {
    const rental = req.body;

    const { error } = rentalSchema.validate(rental, { abortEarly: false});
    const { rows: verifyCustomer } = await connection.query('SELECT * FROM customers WHERE id = $1', [rental.customerId]);
    const { rows: verifyGame } = await connection.query('SELECT * FROM games WHERE id = $1', [rental.gameId]);
    if(error || !verifyCustomer[0] || !verifyGame[0]) {
        return res.sendStatus(400);
    }
    
    const { rows: rentalGames } = await connection.query('SELECT * FROM rentals WHERE "gameId" = $1 and "returnDate" is null', [rental.gameId])
    if(rentalGames.length === verifyGame[0].stockTotal) {
        return res.sendStatus(400);
    }
    
    next();
}

export async function validateFinishRental(req, res, next) {
    const { id } = req.params;

    const { rows: verifyRental } = await connection.query('SELECT * FROM rentals WHERE id = $1', [id])
    if(!verifyRental[0]) {
        return res.sendStatus(404);
    }

    if(verifyRental[0].returnDate !== null) {
        return res.sendStatus(400);
    }

    next();
}

export async function validateDeleteRental(req, res, next) {
    const { id } = req.params;

    const { rows: verifyRental } = await connection.query('SELECT * FROM rentals WHERE id = $1', [id])
    if(!verifyRental[0]) {
        return res.sendStatus(404);
    }

    if(verifyRental[0].returnDate === null) {
        return res.sendStatus(400);
    }
    
    next();
}