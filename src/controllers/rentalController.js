import connection from "../dbStrategy/postgres.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
    let { gameId, customerId} = req.query;
    let query = '';

    if(gameId) {
        query = `WHERE rentals."gameId" = ${gameId}`;
    }
    if(customerId) {
        query = `WHERE rentals."customerId" = ${customerId}`;
    }
    if( gameId && customerId ) {
        query = `WHERE rentals."gameId" = ${gameId} and rentals."customerId" = ${customerId}`;
    }
    try {
        const { rows: rentals } = await connection.query(`
            SELECT 
                rentals.*,
                jsonb_build_object(
                    'id', customers.id,
                    'name', customers.name
                ) as customer,
                jsonb_build_object(
                    'id', games.id,
                    'name', games.name,
                    'categoryId', categories.id,
                    'categoryName', categories.name
                ) as game
            FROM rentals
            JOIN customers
            ON rentals."customerId" = customers.id
            JOIN games
            ON rentals."gameId" = games.id
            JOIN categories
            ON games."categoryId" = categories.id
            ${query}
        `);
        res.send(rentals);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function postRental(req, res) {
    const rental = req.body;
    try {
        const { rows: game } = await connection.query('SELECT * FROM games WHERE id = $1', [rental.gameId]);
        const postRental = {
            customerId: rental.customerId,
            gameId: rental.gameId,
            rentDate: dayjs().format('YYYY-MM-DD'),
            daysRented: rental.daysRented,
            returnDate: null,
            originalPrice: rental.daysRented * game[0].pricePerDay,
            delayFee: null
        }
        await connection.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',[postRental.customerId, postRental.gameId, postRental.rentDate, postRental.daysRented, postRental.returnDate, postRental.originalPrice, postRental.delayFee]);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function finishRental(req, res) {
    const { id } = req.params
    try {
        let delayFee = 0;
        const today = dayjs();
        const { rows: rental } = await connection.query('SELECT * FROM rentals WHERE id = $1', [id]);
        const rentalDate = dayjs(rental[0].rentDate).add(rental[0].daysRented, 'day');
        const date = today.diff(rentalDate, 'days');
        if(date > 0) {
            delayFee = date * (rental[0].originalPrice / rental[0].daysRented)
        }
        
        await connection.query('UPDATE rentals SET ("returnDate", "delayFee") = ($1, $2) WHERE id = $3', [today, delayFee, id])

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params;
    try {
        await connection.query('DELETE FROM rentals WHERE id = $1', [id]);

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}