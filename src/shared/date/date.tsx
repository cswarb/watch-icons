export const FormattedDate = (props: { date: Date}) => {
    const toDate = new Date(props.date);
    
    const dateVal = toDate.getDate().toString().length === 1 ? `0${toDate.getDate()}` : toDate.getDate();
    const monthVal = toDate.getMonth().toString().length === 1 ? `0${toDate.getMonth()}` : toDate.getMonth();
    const yearVal = toDate.getFullYear();

    return (
        <span>
            {yearVal}/{monthVal}/{dateVal}
        </span>
    )
};
