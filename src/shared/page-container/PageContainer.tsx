export const WithPageContainer = (Hoc: any) => {
    return (props: any) => (
        <div className="in-page-container">
            <Hoc {...props} />
        </div>
    )
}
