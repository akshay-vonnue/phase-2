import express from 'express';
import dotenv from 'dotenv'
import router from './routes/route.js';

const app = express()

app.use(express.json())
dotenv.config();

app.use('/', router);

let PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server running at PORT:`,PORT)
})