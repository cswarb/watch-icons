
import { Watch } from './watch.model';

const expressr = require('express');
const router = expressr.Router();

router.get('/', async (req, res) => {
    try {
        const allWatches = await Watch.find();
        return res.status(200).send(allWatches);
    } catch(err) {
        return res.status(500).send({ error: 'Error' });
    };
});

router.get("/watch/:id", async (req, res) => {
    try {
        const watch = await Watch.findOne({ _id: req.params.id });
        return res.status(watch ? 200 : 404).send(watch);
    } catch(err) {
        return res.status(500).send({ error: 'Watch does not exist' });
    };
});

export { router };
