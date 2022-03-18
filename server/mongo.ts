import * as express from 'express';
import * as mongoose from 'mongoose';
import { router as routes } from './routes';
import * as dotenv from './config/environment';
import * as cors from 'cors';
import { down, up } from './watch/hydrate-db';

console.log('dotenv: ', dotenv);

mongoose
    .connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`)
    .then(() => {
        up();

        const app = express();
        app.use(cors());
        app.use(express.json());
        app.use('/api', routes);

        const connection = app.listen(process.env.API_PORT, () => {
            console.log('Server has started');
        });

        connection.on('close', () => {
            down();
        });
    });
