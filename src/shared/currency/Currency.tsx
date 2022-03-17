import { useContext } from 'react';
import { CurrencyContext } from '../../contexts/currency.context';

export const Currency = (props: any) => {
    const currencyCtx = useContext(CurrencyContext);
    const currency = currencyCtx.currencies.get(currencyCtx.token);

    return (
        <p>{currency?.symbol}{props.price}({currency?.token})</p>
    );
}
