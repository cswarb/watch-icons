import * as mongoose from 'mongoose';
import { watchSchema } from './watch.schema';

export const Watch = mongoose.model('Watch', watchSchema);
