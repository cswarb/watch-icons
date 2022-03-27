import { Watch } from './watch.model';

const WATCH_DB_FIXTURE = () => {
    const ro = new Watch({
        make: 'Audemars Piguet', 
        model: 'Royal Oak', 
        shortname: 'jumbo',
        breakdown: [
            {
                title: 'Turbulent beginnings',
                description: 'Launched in 1972 at the Basel fair, the Royal Oak was revealed to th public for the first time. Inspired by a Diver\'s brass helmet and named after a British Royal Navy ship, the watch was not immediately a popular release due to it\'s revolutionary design and high price. Today, the Royal Oak model has a number of iterations available, from the most basic time only comlications, to the haute horology flying toubillons, minute repeaters and iced out openworked pieces.'
            },
            {
                title: 'Steel for Gold',
                description: 'Introduced at the price of 3300 Swiss Francs, this never-seen-before steel timepiece was more expensive than a gold Patek Philippe dress watch and more than ten times the cost of a Rolex Submariner. The message was certainly bold: haute horlogerie could come up with prestigious timepieces without necessarily relying on precious metals.  From this point forward, it was the design, the precision of the execution, and the quality of the movement that counted.'
            },
            {
                title: 'Powered by a joint venture',
                description: 'The Calibre 2120 was introduced in 1967 as the result of a project led by Jaeger-LeCoultre, with the technical contribution of Audemars Piguet and the funding of Audemars Piguet, Patek Philippe and Vacheron Constantin, for the creation of an ultra-thin automatic movement. The joint effort produced the Jaeger-LeCoultre Calibre 920, a highly innovative and reliable movement, that each of the three funding customers renamed and customized (the Patek Philippe 28-255 C was used for the Nautilus while the Vacheron Constantin 1120 powered the 222 model).'
            }
        ],
        noteableModels: [
            {
                title: 'Jumbo',
                date: new Date(),
                description: 'The original and best. Launched in the 70s and revered as the collectors choice, the Jumbo is the Royal Oak in it\'s simplest form - hours and minutes(no seconds hand) with a date complication.Powered by the JLC calibre developed in collaboration with AP, Patek Philippe, and Vacheron Constantin.The Jumbo is still available today as the 16202 50th anniversary edition with the most desirable case dimensions.',
            },
            {
                title: 'Double Balancier',
                date: new Date(),
                description: 'A unique double balance wheel design with an openworked dial, which a high level of finishing. Available in steel, full ceamric and gold versions.',
            }
        ],
        price: {
            rrp: {
                from: {
                    value: 16600,
                    currency: 'GBP'
                },
                to: {
                    value: 27900,
                    currency: 'GBP'
                },
            },
            market: {
                from: {
                    value: 16600,
                    currency: 'GBP'
                },
                to: {
                    value: 27900,
                    currency: 'GBP'
                },
            }
        },
        watchStats: {
            components: 100,
            powerReserveHours: 65,
            functions: [
                {
                    name: 'Hours'
                },
                {
                    name: 'Minutes'
                },
                {
                    name: 'Seconds'
                },
                {
                    name: 'Date'
                }
            ],
            productionNumbersPerYear: 1500,
            productionYears: {
                from: new Date(),
                to: new Date(),
            },
        },
        brandStats: {
            productionNumbersPerYear: 50000,
            revenuePerYear: {
                value: 140000000,
                currency: 'USD'
            },
            location: 'Switzerland',
            founding: new Date(),
            noteableAchievements: [
                {
                    name: 'In 1934, introduced the first skeleton watch.'
                },
                {
                    name: 'In 1972, introduced the world\'s first luxury sport wristwatch, the Royal Oak.'
                },
                {
                    name: 'In 2007/08, developed the first watch with a carbon case and a carbon movement (a Royal Oak Carbon Concept).'
                },
                {
                    name: 'In 2015, the world\'s first mechanical chronograph with independent memory and three column-wheels was launched. Its name, Royal Oak Concept Laptimer Michael Schumacher.'
                },
                {
                    name: 'In 2019, the world\'s thinnest automatic perpetual calendar was presented.'
                },
            ],
            socialActivity: {
                instagram: {
                    tagged: {
                        name: '#royaloak',
                        value: 5000000,
                        date: new Date()
                    }
                }
            },
        }
    });
    const lange = new Watch({
        make: 'A Lange & Sohne',
        model: 'Zeitwerk',
        shortname: 'zeitwerk',
        breakdown: [
            {
                title: 'A technical marvel',
                description: 'The first mechnical watch to showcase a jumping digital display for hours and minutes. Jumping 1608 times a day to show hours and minutes accurately with a 6 o clock sub seconds, and features a power reserve indicator at 12 o clock. The Zeitwerk was an instant classic upon release, winning the GPHG award the same year, thanks to it\'s unqiue design and techical achievements which few watchmakers dare to attempt to copy, even to this day.'
            },
            {
                title: 'Consistent improvement',
                description: 'Powered by the Caliber L043.1 after years of development and updated throughout time to eliminate \'pre-arming\' of the digital display discs every minute, and drastically increasing the power reserve from 36 hours, to 72 hours via a stacked barrel design in the introduction of the Zeitwerk Date. The Zeitwerk uses a remontoir system to store and release the right amount of power every minute - power which is stored in the barrel, housing the thickest mainspring ALS produce that provides the required amount of torque. Excess power which is not needed is dumped via a wind break mechanism.'
            },
            {
                title: 'Variations of an icon',
                description: 'A range of more complicated Zeitwerk models have appeared over the years, including the striking time, minute repeater, and decimal strike models, as well as the introduction of a Date model, and the stylistic exclusive edition, and a personal grail, the Zeitwerk Lumen.'
            }
        ],
        noteableModels: [
            {
                title: 'Lumen',
                date: new Date(),
                description: 'Smoked sapphire + luminous numerals, featuing the 3rd revision of the L043 calibre.',
            },
            {
                title: 'Date',
                date: new Date(),
                description: 'Outer date ring with quick set pusher, and vastly improved power reserve from 36 to 72 hours.',
            }
        ],
        price: {
            rrp: {
                from: {
                    value: 36000,
                    currency: 'GBP'
                },
                to: {
                    value: 73300,
                    currency: 'GBP'
                },
            },
            market: {
                from: {
                    value: 36000,
                    currency: 'GBP'
                },
                to: {
                    value: 60000,
                    currency: 'GBP'
                },
            }
        },
        watchStats: {
            components: 100,
            powerReserveHours: 65,
            functions: [
                {
                    name: 'Hours'
                },
                {
                    name: 'Minutes'
                },
                {
                    name: 'Seconds'
                },
                {
                    name: 'Date'
                }
            ],
            productionNumbersPerYear: 1500,
            productionYears: {
                from: new Date(),
                to: new Date(),
            },
        },
        brandStats: {
            productionNumbersPerYear: 50000,
            revenuePerYear: {
                value: 14000000,
                currency: 'USD'
            },
            location: 'Germany',
            founding: new Date(),
            noteableAchievements: [
                {
                    name: 'In 1864, introduced the three-quarter plate in his pocket watches.'
                },
                {
                    name: 'In 1997, integrated zero-reset mechanism that stops the balance when the crown is pulled and instantaneously moves the seconds hand to the zero position.'
                },
            ],
            socialActivity: {
                instagram: {
                    tagged: {
                        name: '#lange',
                        value: 5000000,
                        date: new Date()
                    }
                }
            },
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