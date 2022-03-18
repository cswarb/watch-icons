export const BrandLogo = ({ imageName }: any) => {
    return (
        <img style={{
            maxWidth: '150px',
            marginBottom: '8px'
        }} src={`/img/${imageName}.svg`} />
    )
}