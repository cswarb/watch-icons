import { CurrencyContext, CURRENCY_TOKEN } from "../../contexts/currency.context"
import { Currency } from "../../shared/currency/Currency"

export const PriceOverTime = (props: any) => {
    return (
        <>
            <h2>
                Price over time
            </h2>
            <CurrencyContext.Provider value={CURRENCY_TOKEN}>
                <Currency price={props.price.from} />
                <Currency price={props.price.to} />
            </CurrencyContext.Provider>
        </>
    )
}
