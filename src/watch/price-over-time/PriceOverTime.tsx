import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { CurrencyContext, CURRENCY_TOKEN } from '../../contexts/currency.context'
import { Card, CardContainer } from '../../shared/card/card';
import { Currency } from '../../shared/currency/Currency'
import { selectPriceById } from '../../store/watch/selectors';
import { PriceOverTimeAnimation } from '../animations/price-over-time';
import { AuctionAnimation } from '../animations/royal-oak/auction';
import { MarketPriceAnimation } from '../animations/royal-oak/market';
import { ModelsAnimation } from '../animations/royal-oak/models';
import { ModelsLineAnimation } from '../animations/royal-oak/models-2';
import { MapAnimation } from '../animations/royal-oak/map';
import { RrpAnimation } from '../animations/royal-oak/rrp';
import { SuggestionAnimation } from '../animations/suggestion';
import { Tooltip } from '../../shared/chart/tooltip';
import { useCallback, useEffect, useState } from 'react';

export const PriceOverTime = ({ priceId }: any) => {
    const price = useSelector(state => selectPriceById(state, priceId));
    const [tooltipData, setTooltipData] = useState({ title: 'Price over time', date: new Date().toString(), headline: { key: 'Key', value: 'Value' } });

    const percentDiff = ((start: number, end: number): string => {
        const diff = (start / end) * 100;
        return `${diff > 0 ? '+' : '-'}${(diff).toFixed(1)}% ${diff > 0 ? 'increase' : 'decrease'}`;
    });

    const isPositiveIncrease = ((start: number, end: number): boolean => {
        const diff = (start / end) * 100;
        return diff > 0;
    });

    const loadTooltipData = (e: any) => {
        // console.log('loadTooltipData', e);
        // setTooltipData({
        //     ...tooltipData,
        //     date: e.date,
        //     headline: {
        //         ...tooltipData.headline,
        //         key: 'Price,
        //         value: `RRP: ${e.rrp} - Price: ${e.price}`
        //     }
        // });
    };

    const genData: any = () => {
        return [
            { date: '2018-06-01', price: 9000, rrp: 8000 },
            { date: '2018-07-01', price: 8250, rrp: 8000 },
            { date: '2018-08-01', price: 8500, rrp: 8000 },
            { date: '2018-09-01', price: 9500, rrp: 8000 },
            { date: '2018-10-01', price: 7500, rrp: 8000 },
            { date: '2018-11-01', price: 5999, rrp: 8000 },
            { date: '2018-12-01', price: 8500, rrp: 8000 },
            { date: '2019-01-01', price: 7500, rrp: 8000 },
            { date: '2019-02-01', price: 8000, rrp: 8000 },
            { date: '2019-03-01', price: 9000, rrp: 8000 },
            { date: '2019-04-01', price: 11000, rrp: 8000 },
            { date: '2019-05-01', price: 11250, rrp: 8000 },
            { date: '2019-06-01', price: 12000, rrp: 8000 },
            { date: '2019-07-01', price: 12100, rrp: 8000 },
            { date: '2019-08-01', price: 12200, rrp: 10000 },
            { date: '2019-09-01', price: 12500, rrp: 10000 },
            { date: '2019-10-01', price: 15000, rrp: 10000 },
            { date: '2019-11-01', price: 15500, rrp: 10000 },
            { date: '2019-12-01', price: 15250, rrp: 10000 },
            { date: '2020-01-01', price: 15000, rrp: 10000 },
            { date: '2020-02-01', price: 16000, rrp: 10000 },
            { date: '2020-03-01', price: 17000, rrp: 10000 },
            { date: '2020-04-01', price: 18500, rrp: 13500 },
            { date: '2020-05-01', price: 17500, rrp: 13500 },
            { date: '2020-06-01', price: Math.random() * 20000, rrp: Math.random() * 20000 },
        ];
    };

    const [dt, setDt] = useState(genData());
    const updateDt = () => {
        setDt(genData());
    };
    
    return (
        <div>
            <div className="watch-section-title">
                Price over time
            </div>

            <Card align={'left'} title={'How has this reference withstood the test of time?'} description={'By comparing the retail price vs an average market price, we can guage how popular this model is'} />

            {/* <div>
                Time period selection
                <select name="" id=""></select>
            </div> */}

            <button type="button" onClick={updateDt.bind(this)}>Update Data</button>

            <PriceOverTimeAnimation data={dt} loadTooltipData={(e: any) => loadTooltipData(e)}>
                <Tooltip data={tooltipData} />
            </PriceOverTimeAnimation>

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
                        <h3 className="price__title">Auction results <span className="price__sub-title">(various sources)</span></h3>
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
                        <AuctionAnimation />
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

                {/* <section className="price-over-time__container">
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
                </section> */}

                <section className="price-over-time__container">
                    <header className="price-over-time__header">
                        {/* <h3 className="price__title">Map</h3> */}
                     </header>

                    <footer className="price__chart-container">
                        <MapAnimation />
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
                            <a className="price__chart-overlay-cta" target="_blank" href="//cswarb.github.io/new-portfolio/">Get in touch</a>
                        </div>
                    </footer>
                </section>
            </div>
        </div>
    )
}
