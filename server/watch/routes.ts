import { WATCH_DB_FIXTURE as seed } from './hydrate-db';
import { Watch } from './watch.model';

const expressr = require('express');
const router = expressr.Router();

router.get('/', async (req, res) => {
    const posts = await Watch.find();
    res.status(200).send(posts);
});

router.get('/remove-all', async (req, res) => {
    const removal = await Watch.deleteMany({});
    res.status(200).send(removal);
});

router.get('/seed', async (req, res) => {
    const saved = await Watch.bulkSave(seed());
    res.status(200).send(saved);
});

export { router };
