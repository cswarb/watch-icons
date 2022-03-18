import { AlsLogo } from './Als';
import { ApLogo } from './Ap';

export enum WatchBrands {
    AP = 'AP',
    ALS = 'ALS'
}

const getWatchLogo = (brand: string) => {
    switch (brand) {
        case 'Audemars Piguet':
            return ApLogo;
        case 'A Lange & Sohne':
            return AlsLogo;
        default:
            return ApLogo;
    };
}

export const WatchBrandFactory = ({ make, ...props }: any) => {
    const Brand = getWatchLogo(make);

    return (
        <Brand {...props} />
    )
}