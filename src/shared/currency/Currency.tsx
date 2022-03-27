import { useContext } from 'react';
import { CurrencyContext } from '../../contexts/currency.context';

export const Currency = ({ time, price, currency, ...props }: any) => {
    const currencyCtx = useContext(CurrencyContext);
    const currencyInfo = currencyCtx.currencies.get(currency);

    return (
        <div className="currency">
            <h4 className="currency__period">{time}</h4>
            <p className="currency__value">{currencyInfo?.symbol}{price}({currencyInfo?.token})</p>
        </div>
    );
}
