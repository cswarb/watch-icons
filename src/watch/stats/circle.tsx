import { Map } from 'immutable';

export enum CircleSize {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE',
}

export const StatCircle = ({ figure, description, color, size, ...props }: any) => {
    const mapSizeDimension = Map<CircleSize, string>()
        .set(CircleSize.LARGE, '400px')
        .set(CircleSize.MEDIUM, '300px')
        .set(CircleSize.SMALL, '250px')

    function sizeToDimension(size: CircleSize): string {
        return mapSizeDimension.get(size) || '200px';
    }

    const circleStyle = {
        backgroundColor: '#a7a593' || color,
        width: sizeToDimension(size),
        height: sizeToDimension(size)
    };

    return (
        <div {...props} className="circle" style={circleStyle}>
            <p className="circle-figure">~{figure}</p>
            <p className="circle-description">{description}</p>
        </div>
    )
};