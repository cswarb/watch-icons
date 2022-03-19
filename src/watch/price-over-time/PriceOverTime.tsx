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
            
            <CurrencyContext.Provider value={CURRENCY_TOKEN}>
                <Currency price={price.from} />
                <Currency price={price.to} />
            </CurrencyContext.Provider>

            <PriceOverTimeAnimation />
        </>
    )
}
