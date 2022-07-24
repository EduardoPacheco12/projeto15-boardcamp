import joi from "joi";

const dateNow = Date.now();
const date = new Date(dateNow);
const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern(new RegExp('^[0-9]{10,11}')).required(),
    cpf: joi.string().pattern(new RegExp('^[0-9]{11}')).required(),
    birthday: joi.date().max(date).required()
});

export default customerSchema;