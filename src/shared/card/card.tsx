import classNames from 'classnames';

export const CardContainer = (props: any) => {
    return (
        <section className="card-section">
            {props.children}
        </section>
    )
}

export const Card = ({ title, description, align, width }: any) => {
    return (
        <div className={classNames('card',
                            {
                                ['card--align-left']: align === 'left',
                                ['card--align-right']: align === 'right',
                                ['card--align-center']: align === 'center',
                                ['card--full-width']: width === 'full'
                            }
                        )}>
            <header className="card-header">
                <h3 className="card__title">{title}</h3>
            </header>
            <footer className="card-content">
                <p className="card-content-description">{description}</p>
            </footer>
        </div>
    )
}
