import { WithPageContainer } from "../shared/page-container/PageContainer";
import { Library } from "./Library";

export const LibraryContainer = (props: any) => {
    return (
        <Library {...props} />
    );
}

export const LibraryContainerWithPageContainer = WithPageContainer(LibraryContainer);
