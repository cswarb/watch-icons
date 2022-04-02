import { Card } from "../shared/card/card";
import { WithPageContainer } from "../shared/page-container/PageContainer"

export const AboutContainer = () => {
    return (
        <>
            <div className="grid">
                <Card width={'full'} align={'left'} title={'Hello world'} description={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, dolorem consequuntur quod dignissimos aspernatur quas numquam eius saepe doloribus cumque sapiente, cupiditate natus dolor, provident ab illum aut iusto quidem?'}></Card>

                <img className="about__image" src="/img/sub.jpg" />
            </div>
        </>
    )
}

export const AboutContainerWithPageContainer = WithPageContainer(AboutContainer);