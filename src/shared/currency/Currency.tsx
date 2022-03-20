import { useContext } from 'react';
import { CurrencyContext } from '../../contexts/currency.context';

export const Currency = ({ time, price, ...props }: any) => {
    const currencyCtx = useContext(CurrencyContext);
    const currency = currencyCtx.currencies.get(currencyCtx.token);

    return (
        <div className="currency-box">
            <h4 className="currency-box__title">{time}</h4>
            <p className="currency-box__price">{currency?.symbol}{price}({currency?.token})</p>
        </div>
    );
}
