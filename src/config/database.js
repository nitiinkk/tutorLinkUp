import pg from "pg";
const { Pool } = pg;

const dbConnection = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
});


export { dbConnection };
