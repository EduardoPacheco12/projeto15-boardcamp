import categorySchema from "../schemas/categorySchema.js";
import connection from "../dbStrategy/postgres.js";

export async function validatePostCategory(req, res, next) {
    const body = req.body;
    
    const { error } = categorySchema.validate(body, { abortEarly: false });
    if (error) {
        return res.sendStatus(400);
    }
    
    const { rows: verifyCategory } = await connection.query('SELECT * FROM categories WHERE name = $1', [body.name]);
    if(verifyCategory[0]) {
        return res.sendStatus(409);
    }

    next();
}