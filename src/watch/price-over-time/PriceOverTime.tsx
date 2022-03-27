import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { CurrencyContext, CURRENCY_TOKEN } from '../../contexts/currency.context'
import { Card } from '../../shared/card/card';
import { Currency } from '../../shared/currency/Currency'
import { selectPriceById } from '../../store/watch/selectors';
import { PriceOverTimeAnimation } from '../animations/price-over-time';
import { HypeAnimation } from '../animations/royal-oak/hype';
import { MarketPriceAnimation } from '../animations/royal-oak/market';
import { ModelsAnimation } from '../animations/royal-oak/models';
import { ModelsLineAnimation } from '../animations/royal-oak/models-2';
import { RadialAnimation } from '../animations/royal-oak/radial';
import { RrpAnimation } from '../animations/royal-oak/rrp';
import { SuggestionAnimation } from '../animations/suggestion';

export const PriceOverTime = ({ priceId }: any) => {
    const price = useSelector(state => selectPriceById(state, priceId));

    const percentDiff = ((start: number, end: number): string => {
        const diff = (start / end) * 100;
        return `${diff > 0 ? '+' : '-'}${(diff).toFixed(1)}% ${diff > 0 ? 'increase' : 'decrease'}`;
    });

    const isPositiveIncrease = ((start: number, end: number): boolean => {
        const diff = (start / end) * 100;
        return diff > 0;
    });
    
    return (
        <div>
            <div className="watch-section-title">
                Price over time
            </div>

            <div>
                Time period selection
                <select name="" id=""></select>
            </div>

            <PriceOverTimeAnimation />

            <div className="price-over-time__breakdown">
                <section className="price-over-time__container">
                    <header className="price-over-time__header">
                        <h3 className="price__title">RRP</h3>
                        <div className="price__from-to">
                            <CurrencyContext.Provider value={CURRENCY_TOKEN}>
                                <Currency time={'Release - 2018'} price={price.rrp.from.value} currency={price.rrp.from.currency} />
                                <span className="">{'>'}</span>
                                <Currency time={'Now - 2022'} price={price.rrp.to.value} currency={price.rrp.to.currency} />
                            </CurrencyContext.Provider>
                        </div>
                        <p className={classNames('price__sentiment',
                            {
                                ['price__sentiment--good']: isPositiveIncrease(price.rrp.from.value, price.rrp.to.value),
                                ['price__sentiment--bad']: !isPositiveIncrease(price.rrp.from.value, price.rrp.to.value)
                            }
                        )}>{percentDiff(price.rrp.from.value, price.rrp.to.value)}</p>
                    </header>

                    <footer className="price__chart-container">
                        <RrpAnimation />
                    </footer>
                </section>
                
                <section className="price-over-time__container">
                    <header className="price-over-time__header">
                        <h3 className="price__title">Market</h3>
                        <div className="price__from-to">
                            <CurrencyContext.Provider value={CURRENCY_TOKEN}>
                                <Currency time={'Release - 2018'} price={price.market.from.value} currency={price.market.from.currency} />
                                <span className="">{'>'}</span>
                                <Currency time={'Now - 2022'} price={price.market.to.value} currency={price.market.to.currency} />
                            </CurrencyContext.Provider>
                        </div>
                        <p className={classNames('price__sentiment',
                            {
                                ['price__sentiment--good']: isPositiveIncrease(price.market.from.value, price.market.to.value),
                                ['price__sentiment--bad']: !isPositiveIncrease(price.market.from.value, price.market.to.value)
                            }
                        )}>{percentDiff(price.market.from.value, price.market.to.value)}</p>
                   </header>

                    <footer className="price__chart-container">
                        <MarketPriceAnimation />
                    </footer>
                </section>

                <section className="price-over-time__container">
                    <header className="price-over-time__header">
                        <h3 className="price__title">Hype <span className="price__sub-title">(Determined by search figures)</span></h3>
                        <div className="price__from-to">
                            <CurrencyContext.Provider value={CURRENCY_TOKEN}>
                                <Currency time={'Release - 2018'} price={price.market.from.value} currency={price.market.from.currency} />
                                <span className="">{'>'}</span>
                                <Currency time={'Now - 2022'} price={price.market.to.value} currency={price.market.to.currency} />
                            </CurrencyContext.Provider>
                        </div>
                        <p className={classNames('price__sentiment',
                            {
                                ['price__sentiment--good']: isPositiveIncrease(price.market.from.value, price.market.to.value),
                                ['price__sentiment--bad']: !isPositiveIncrease(price.market.from.value, price.market.to.value)
                            }
                        )}>{percentDiff(price.market.from.value, price.market.to.value)}</p>
                   </header>

                    <footer className="price__chart-container">
                        <HypeAnimation />
                    </footer>
                </section>

                <section className="price-over-time__container">
                    <header className="price-over-time__header">
                        <h3 className="price__title">Model price comparison <span className="price__sub-title">(15202ST)</span></h3>
                        <div className="price__from-to">
                            <CurrencyContext.Provider value={CURRENCY_TOKEN}>
                                <Currency time={'Release - 2018'} price={price.market.from.value} currency={price.market.from.currency} />
                                <span className="">{'>'}</span>
                                <Currency time={'Now - 2022'} price={price.market.to.value} currency={price.market.to.currency} />
                            </CurrencyContext.Provider>
                        </div>
                        <p className={classNames('price__sentiment',
                            {
                                ['price__sentiment--good']: isPositiveIncrease(price.market.from.value, price.market.to.value),
                                ['price__sentiment--bad']: !isPositiveIncrease(price.market.from.value, price.market.to.value)
                            }
                        )}>{percentDiff(price.market.from.value, price.market.to.value)}</p>
                    </header>

                    <footer className="price__chart-container">
                        <ModelsAnimation />
                    </footer>
                </section>

                <section className="price-over-time__container">
                    <header className="price-over-time__header">
                        <h3 className="price__title">Model price comparison <span className="price__sub-title">(15202ST)</span></h3>
                        <div className="price__from-to">
                            <CurrencyContext.Provider value={CURRENCY_TOKEN}>
                                <Currency time={'Release - 2018'} price={price.market.from.value} currency={price.market.from.currency} />
                                <span className="">{'>'}</span>
                                <Currency time={'Now - 2022'} price={price.market.to.value} currency={price.market.to.currency} />
                            </CurrencyContext.Provider>
                        </div>
                        <p className={classNames('price__sentiment',
                            {
                                ['price__sentiment--good']: isPositiveIncrease(price.market.from.value, price.market.to.value),
                                ['price__sentiment--bad']: !isPositiveIncrease(price.market.from.value, price.market.to.value)
                            }
                        )}>{percentDiff(price.market.from.value, price.market.to.value)}</p>
                    </header>

                    <footer className="price__chart-container">
                        <ModelsLineAnimation />
                    </footer>
                </section>

                <section className="price-over-time__container">
                    <header className="price-over-time__header">
                        <h3 className="price__title">Model price comparison <span className="price__sub-title">(15202ST)</span></h3>
                        <div className="price__from-to">
                            <CurrencyContext.Provider value={CURRENCY_TOKEN}>
                                <Currency time={'Release - 2018'} price={price.market.from.value} currency={price.market.from.currency} />
                                <span className="">{'>'}</span>
                                <Currency time={'Now - 2022'} price={price.market.to.value} currency={price.market.to.currency} />
                            </CurrencyContext.Provider>
                        </div>
                        <p className={classNames('price__sentiment',
                            {
                                ['price__sentiment--good']: isPositiveIncrease(price.market.from.value, price.market.to.value),
                                ['price__sentiment--bad']: !isPositiveIncrease(price.market.from.value, price.market.to.value)
                            }
                        )}>{percentDiff(price.market.from.value, price.market.to.value)}</p>
                    </header>

                    <footer className="price__chart-container">
                        <RadialAnimation />
                    </footer>
                </section>

                <section className="price-over-time__container">
                    <header className="price-over-time__header"></header>

                    <footer className="price__chart-container">
                        <div className="price__chart-container--overlay">
                            <SuggestionAnimation />
                        </div>
                        <div className="price__chart-overlay-text">
                            <p className="price__chart-overlay-title">Have a suggestion for a visualisation?</p>
                            <p className="price__chart-overlay-cta">Get in touch</p>
                        </div>
                    </footer>
                </section>
            </div>
        </div>
    )
}
