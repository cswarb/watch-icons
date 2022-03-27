import React from 'react';
import { Map } from 'immutable';

export enum Currency {
    USD = 'USD',
    GBP = 'GBP'
}

export const CURRENCY_TOKEN = {
    currencies: Map<Currency, { symbol: string, token: Currency }>()
        .set(Currency.USD, {
            symbol: '$',
            token: Currency.USD
        })
        .set(Currency.GBP, {
            symbol: '£',
            token: Currency.GBP
        }),
}

export const CurrencyContext = React.createContext(CURRENCY_TOKEN);