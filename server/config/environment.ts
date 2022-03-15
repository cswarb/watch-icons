import * as dotenv from 'dotenv';

var environment = (() => {
    const res = dotenv.config({
        path: __dirname + '/.env',
        debug: Boolean(process.env.DEBUG)
    });

    if (res.error) {
        throw res.error;
    };

    return {
        res: res
    };
})();

export const { parsed: envs } = environment.res;