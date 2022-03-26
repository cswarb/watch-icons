import { useSelector } from 'react-redux';
import { Card, CardContainer } from '../../shared/card/card';
import { WatchReducerNoteableModels } from '../../store/watch/reducer';
import { selectDerivedNoteableModelsById } from '../../store/watch/selectors';

const NoteableModelItem = ({ noteableItem }: { noteableItem: WatchReducerNoteableModels }) => {
    return (
        <Card title={noteableItem.title} description={
            <>
                <p>{noteableItem.description}</p>
                <p>{noteableItem.date}</p>
            </>
        }>
        </Card>
    )
}

const NoteableModelList = ({ noteableModels }: { noteableModels: Array<WatchReducerNoteableModels> }) => {
    const list = noteableModels.map((n, i) => {
        console.log(n);
        
        return <NoteableModelItem key={`${n._id}-${i}`} noteableItem={n} />;
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
            <div className="watch-section-title">
                Noteable models in the series
            </div>

            <NoteableModelList noteableModels={noteableModels} />
        </>
    )
}
