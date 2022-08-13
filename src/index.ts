import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import path from 'path';

dotenv.config();

const app: Express = express();
const PORT = process.env.EXPRESS_PORT;

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, './assets/index.html'));
});

module.exports = app.listen(PORT, () => {
  console.log(`🔥 INFERNOde listening on port ${PORT} 🔥`);
});