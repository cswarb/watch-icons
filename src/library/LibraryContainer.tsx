import { WithDynamicBackground } from "../shared/dynamic-background/DynamicBackground";
import { WithPageContainer } from "../shared/page-container/PageContainer";
import { Library } from "./Library";

export const LibraryContainer = (props: any) => {
    return (
        <WithDynamicBackground>
            <Library {...props} />
        </WithDynamicBackground>
    );
}

export const LibraryContainerWithPageContainer = WithPageContainer(LibraryContainer);
