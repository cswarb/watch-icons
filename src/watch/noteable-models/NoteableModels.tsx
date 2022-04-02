import { useSelector } from 'react-redux';
import { Card, CardContainer } from '../../shared/card/card';
import { FormattedDate } from '../../shared/date/date';
import { WatchReducerNoteableModels } from '../../store/watch/reducer';
import { selectDerivedNoteableModelsById } from '../../store/watch/selectors';

const NoteableModelItem = ({ noteableItem, i }: { noteableItem: WatchReducerNoteableModels, i: number }) => {
    const align = i % 2 === 0 ? 'left' : 'right';

    return (
        <Card align={align} title={
            <>
                <h3 className="card__title">{noteableItem.title}</h3> 
                <span className="card__title-meta">
                    <FormattedDate date={noteableItem.date} />
                </span>
            </>
        } description={noteableItem.description}>
        </Card>
    )
}

const NoteableModelList = ({ noteableModels }: { noteableModels: Array<WatchReducerNoteableModels> }) => {
    const list = noteableModels.map((n, i) => {
        return <NoteableModelItem key={`${n._id}-${i}`} noteableItem={n} i={i} />;
    });

    return (
        <CardContainer>
            {list}
        </CardContainer>
    )
}

export const NoteableModels = ({ modelIds }: any) => {
    const noteableModels = useSelector(state => selectDerivedNoteableModelsById(state, modelIds));
    
    return (
        <>
            <h2 className="watch-section-title">
                Noteable models in the series
            </h2>

            <NoteableModelList noteableModels={noteableModels} />
        </>
    )
}
