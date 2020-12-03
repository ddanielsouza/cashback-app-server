import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';

import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import net from 'net';
import AppError from '@shared/errors/AppError';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, _request: Request, response: Response, _next: NextFunction) => {
   if (err instanceof AppError) {
      return response.status(err.statusCode).json({
         status: 'error',
         message: err.message,
      });
   }

   console.error(err);

   return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
   });
});

const listener = app.listen(3333, () => {
   const { port } = listener.address() as net.AddressInfo;
   console.log(`Server started on port ${port}`);
});
