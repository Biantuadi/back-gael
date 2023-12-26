import express from 'express';
import userRouter from './routes/user.routes';
import { connectToMongoDB } from './db/mongoDB';
// dotenv.config();
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json( { limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

connectToMongoDB();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});