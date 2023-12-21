
import "dotenv/config";
import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import routes from './routes/index.js';
import { errorHandler } from "./utils/errorHandler.js";
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

const exitHandler = (options, err) => {
    if (err) {
        console.log(`Encountered error ${err}`);
    }
    console.log("Stopping Server");
    process.exit(1);
}


process.on("SIGINT", exitHandler.bind(null, {}));
process.on("SIGTERM", exitHandler.bind(null, {}));

// Catches uncaught exceptions and rejections
process.on("uncaughtException", exitHandler.bind(null, {}));
process.on("unhandledRejection", exitHandler.bind(null, {}));

startServer();