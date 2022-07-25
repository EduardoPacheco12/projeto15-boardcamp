import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import getRouters from "./routers/getRouters.js";
import postRouters from "./routers/postRouters.js";
import putRouters from "./routers/putRouters.js";
import deleteRouters from "./routers/deleteRouters.js";

dotenv.config();

const server = express();
server.use(cors());
server.use(json());

server.use(postRouters);
server.use(getRouters);
server.use(putRouters);
server.use(deleteRouters);

server.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
})