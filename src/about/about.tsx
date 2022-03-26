import { WithPageContainer } from "../shared/page-container/PageContainer"

export const AboutContainer = () => {
    return (
        <>
            <div className="grid">
                <p className="about__slug">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, dolorem consequuntur quod dignissimos aspernatur quas numquam eius saepe doloribus cumque sapiente, cupiditate natus dolor, provident ab illum aut iusto quidem?</p>

                <img className="about__image" src="/img/sub.jpg" />
            </div>

            <p>Made by <a href="//chrisswarbrick.co.uk">chrisswarbrick.co.uk</a></p>
        </>
    )
}

export const AboutContainerWithPageContainer = WithPageContainer(AboutContainer);