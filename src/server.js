
import "dotenv/config";
import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import routes from './routes/index.js';
import { errorHandler } from "./utils/errorHandler.js";
// import { dbConnection } from "./config/database.js";
const PORT = process.env.PORT || 3000;

const startServer = () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/api', routes);
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server started on Port: ${PORT}`);
    });
}

startServer();