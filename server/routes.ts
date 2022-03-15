import * as express from 'express';
const router = express.Router();
import { router as watchRoutes } from './watch/routes';

router.use('/watches', watchRoutes);

export { router };
