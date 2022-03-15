import { Watch } from './watch.model';

const WATCH_DB_FIXTURE = () => {
    const ro = new Watch({
        make: 'Audemars Piguet', 
        model: 'Royal Oak 15202', 
        breakdown: [
            {
                description: 'good description'
            }
        ],
        noteableModels: ['2017'],
        price: {
            from: '0',
            to: '100',
        }
    });
    const lange = new Watch({
        make: 'A Lange & Sohne',
        model: 'Zeitwerk',
        breakdown: [
            {
                description: 'good description'
            }
        ],
        noteableModels: ['Lumen'],
        price: {
            from: '0',
            to: '1000',
        }
    });

    return [ro, lange];
};

export { WATCH_DB_FIXTURE };