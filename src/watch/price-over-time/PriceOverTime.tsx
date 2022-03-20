import { useSelector } from 'react-redux';
import { CurrencyContext, CURRENCY_TOKEN } from '../../contexts/currency.context'
import { Card } from '../../shared/card/card';
import { Currency } from '../../shared/currency/Currency'
import { selectPriceById } from '../../store/watch/selectors';
import { PriceOverTimeAnimation } from '../animations/price-over-time';

export const PriceOverTime = ({ priceId }: any) => {
    const price = useSelector(state => selectPriceById(state, priceId));

    const percentDiff = ((start: number, end: number): string => {
        const diff = (start / end) * 100;
        return `${(diff).toFixed(1)}% ${diff > 0 ? 'increase' : 'decrease'}`;
    });
    
    return (
        <>
            <div className="watch-section-title">
                Price over time
            </div>

            <Card title={'RRP value'} description={
                <>
                    <div className="currency-container">
                        <CurrencyContext.Provider value={CURRENCY_TOKEN}>
                            <Currency time={'Release (2018)'} price={price.from} />
                            <span className="currency-box__separator">{'>'}</span>
                            <Currency time={'Now (2022)'} price={price.to} />
                        </CurrencyContext.Provider>
                    </div>
                    <p>{percentDiff(price.from, price.to)}</p>
                </>
            }></Card>

            <Card title={'Market value'} description={
                <>
                    <div className="currency-container">
                        <CurrencyContext.Provider value={CURRENCY_TOKEN}>
                            <Currency time={'From (2018)'} price={price.from} />
                            <span className="currency-box__separator">{'>'}</span>
                            <Currency time={'To (2022)'} price={price.to} />
                        </CurrencyContext.Provider>
                    </div>
                    <p>{percentDiff(price.from, price.to)}</p>
                </>
            }></Card>
            

            <PriceOverTimeAnimation />
        </>
    )
}
