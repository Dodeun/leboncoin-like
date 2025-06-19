import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { Pool } from "mysql2/promise";

dotenv.config();

export const db: Pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
});
