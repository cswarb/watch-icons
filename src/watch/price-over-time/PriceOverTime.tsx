import { useSelector } from 'react-redux';
import { CurrencyContext, CURRENCY_TOKEN } from '../../contexts/currency.context'
import { Currency } from '../../shared/currency/Currency'
import { selectPriceById } from '../../store/watch/selectors';
import { PriceOverTimeAnimation } from '../animations/price-over-time';
import { StyledSectionTitle } from '../Watch';

export const PriceOverTime = ({ priceId }: any) => {
    const price = useSelector(state => selectPriceById(state, priceId));
    
    return (
        <>
            <StyledSectionTitle>
                Price over time
            </StyledSectionTitle>

            <p>RRP: £10,000</p>

            <p>RRP vs Market price (dual line chart toggle)</p>
            
            <p>Market value</p>
            <div className="currency-container">
                <CurrencyContext.Provider value={CURRENCY_TOKEN}>
                    <Currency time={'From (2018)'} price={price.from} />
                    <span className="currency-box__separator">{'>'}</span>
                    <Currency time={'To (2022)'} price={price.to} />
                </CurrencyContext.Provider>
            </div>

            <p>6000% increase/decrease</p>

            <PriceOverTimeAnimation />
        </>
    )
}
