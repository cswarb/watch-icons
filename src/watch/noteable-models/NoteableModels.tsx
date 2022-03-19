import { useSelector } from 'react-redux';
import { WatchReducerNoteableModels } from '../../store/watch/reducer';
import { selectDerivedNoteableModelsById } from '../../store/watch/selectors';
import { StyledSectionTitle } from '../Watch';

const NoteableModelItem = ({ noteableItem }: { noteableItem: WatchReducerNoteableModels }) => {
    return (
        <>
            <h3>{noteableItem.title}</h3>
            <p>{noteableItem.description}</p>
            <p>{noteableItem.date}</p>
        </>
    )
}

const NoteableModelList = ({ noteableModels }: { noteableModels: Array<WatchReducerNoteableModels> }) => {
    const list = noteableModels.map((n) => {
        return <NoteableModelItem key={n._id} noteableItem={n} />;
    });

    return (
        <>
            {list}
        </>
    )
}

export const NoteableModels = ({ modelIds }: any) => {
    const noteableModels = useSelector(state => selectDerivedNoteableModelsById(state, modelIds));
    
    return (
        <>
            <StyledSectionTitle>
                Noteable models in the series
            </StyledSectionTitle>

            <NoteableModelList noteableModels={noteableModels} />
        </>
    )
}
