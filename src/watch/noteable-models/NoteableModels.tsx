import { useSelector } from 'react-redux';
import { debug } from '../../shared/debug/debug'
import { selectDerivedNoteableModelsById } from '../../store/watch/selectors';

export const NoteableModels = ({ modelIds }: any) => {
    const noteableModels = useSelector(state => selectDerivedNoteableModelsById(state, modelIds));
    
    return (
        <>
            <h2>
                Noteable models in the series
            </h2>

            <p>{debug(noteableModels)}</p>
        </>
    )
}
