import { Watch } from './watch.model';

const WATCH_DB_FIXTURE = () => {
    const ro = new Watch({
        make: 'Audemars Piguet', 
        model: 'Royal Oak 15202', 
        shortname: 'jumbo',
        breakdown: [
            {
                title: 'Breakdown title',
                description: 'good description 1'
            },
            {
                title: 'Breakdown title',
                description: 'good description 2'
            },
            {
                title: 'Breakdown title',
                description: 'good description 3'
            }
        ],
        noteableModels: [
            {
                title: '2017 Jumbo',
                date: new Date(),
                description: 'Updated dial colour',
            }
        ],
        price: {
            from: '0',
            to: '100',
        }
    });
    const lange = new Watch({
        make: 'A Lange & Sohne',
        model: 'Zeitwerk',
        shortname: 'zeitwerk',
        breakdown: [
            {
                title: 'Breakdown title',
                description: 'good description 1'
            },
            {
                title: 'Breakdown title',
                description: 'good description 2'
            },
            {
                title: 'Breakdown title',
                description: 'good description 3'
            }
        ],
        noteableModels: [
            {
                title: 'Lumen',
                date: new Date(),
                description: 'Smoked sapphire + luminous numerals',
            },
            {
                title: 'Date',
                date: new Date(),
                description: 'Outer date ring with quick set pusher',
            }
        ],
        price: {
            from: '0',
            to: '1000',
        }
    });

    return [ro, lange];
};

const up = async () => {
    const removal = await Watch.deleteMany({});
    const saved = await Watch.bulkSave(WATCH_DB_FIXTURE());
}

const down = async () => {
    const removal = await Watch.deleteMany({});
}

export { up, down };