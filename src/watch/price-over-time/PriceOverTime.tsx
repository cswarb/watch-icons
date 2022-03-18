import { useSelector } from 'react-redux';
import { CurrencyContext, CURRENCY_TOKEN } from '../../contexts/currency.context'
import { Currency } from '../../shared/currency/Currency'
import { debug } from '../../shared/debug/debug';
import { selectPriceById } from '../../store/watch/selectors';

export const PriceOverTime = ({ priceId }: any) => {
    const price = useSelector(state => selectPriceById(state, priceId));
    
    return (
        <>
            <h2>
                Price over time
            </h2>
            <CurrencyContext.Provider value={CURRENCY_TOKEN}>
                <Currency price={price.from} />
                <Currency price={price.to} />
            </CurrencyContext.Provider>
        </>
    )
}
