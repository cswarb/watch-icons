export const CardContainer = (props: any) => {
    return (
        <section className="card-section">
            {props.children}
        </section>
    )
}

export const Card = ({ title, description }: any) => {
    return (
        <div className="card">
            <header className="card-header">
                <h3 className="card__title">{title}</h3>
            </header>
            <footer className="card-content">
                <p>{description}</p>
            </footer>
        </div>
    )
}
