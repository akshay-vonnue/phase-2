import express from 'express';
import router from './routes/route.js';
const app = express();
app.use(express.json());
app.use('/', router);
app.listen(3000, () => {
    console.log(`server running at PORT:`, 3000);
});
