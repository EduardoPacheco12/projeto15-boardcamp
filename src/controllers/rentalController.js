import connection from "../dbStrategy/postgres.js";
import dayjs from "dayjs";

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