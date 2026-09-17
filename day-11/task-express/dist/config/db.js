import { Pool } from "pg";
import dotenv from 'dotenv';
dotenv.config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
});
async function verifyConnection() {
    try {
        const client = await pool.connect();
        console.log(`connected to postgresql database ${client}`);
        client.release();
    }
    catch (error) {
        console.log(`error connecting to db`, error);
    }
}
verifyConnection();
export default pool;
