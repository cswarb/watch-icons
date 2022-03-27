export interface WatchResponse {
    breakdown: Array<{ _id: string, title: string, description: string }>;
    make: string;
    model: string;
    noteableModels: Array<{ _id: string, title: string, date: Date, description: string }>;
    price: {
        _id: string
        rrp: {
            from: {
                value: number,
                currency: string
            },
            to: {
                value: number,
                currency: string
            },
        },
        market: {
            from: {
                value: number,
                currency: string
            },
            to: {
                value: number,
                currency: string
            },
        }
    },
    brandStats: {
        _id: string;
        productionNumbersPerYear: number,
        revenuePerYear: {
            value: number,
            currency: string
        },
        location: string,
        founding: Date,
        noteableAchievements: [
            {
                _id: string,
                name: string
            }
        ],
        socialActivity: {
            instagram: {
                tagged: {
                    name: string,
                    value: number,
                    date: Date
                }
            }
        },
    },
    watchStats: {
        _id: string;
        productionYears: {
            from: Date,
            to: Date,
        },
        components: number,
        powerReserveHours: number,
        functions: [ WatchResponseFunction ],
        productionNumbersPerYear: number,
    },
    shortname: string;
    _id: string;
};


interface WatchResponseFunction {
    name: string,
    _id: string
}
