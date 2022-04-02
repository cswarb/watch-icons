import { Card } from "../shared/card/card";

export const Outro = ({ title, description }: any) => {
    return (
        <div className="outro">
            <Card align={'center'} title={title} description={description} />
        </div>
    )
};