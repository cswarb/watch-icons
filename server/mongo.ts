import * as express from 'express';
import * as mongoose from 'mongoose';
import { router as routes } from './routes';
import * as dotenv from './config/environment';

console.log('dotenv: ', dotenv);

mongoose
    .connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`)
    .then(() => {
        const app = express();
        app.use(express.json());
        app.use('/api', routes);

        app.listen(process.env.API_PORT, () => {
            console.log('Server has started')
        });
    });
