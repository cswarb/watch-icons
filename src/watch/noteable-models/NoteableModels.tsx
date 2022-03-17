import { debug } from "../../shared/debug/debug"

export const NoteableModels = (props: any) => {
    return (
        <>
            <h2>
                Noteable models in the series
            </h2>

            <p>{debug(props.models)}</p>
        </>
    )
}
