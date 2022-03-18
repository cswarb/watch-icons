import { Watch } from './watch.model';

const WATCH_DB_FIXTURE = () => {
    const ro = new Watch({
        make: 'Audemars Piguet', 
        model: 'Royal Oak 15202', 
        shortname: 'jumbo',
        breakdown: [
            {
                description: 'good description 1'
            },
            {
                description: 'good description 2'
            },
            {
                description: 'good description 3'
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
        shortname: 'zeitwerk',
        breakdown: [
            {
                description: 'good description 4'
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