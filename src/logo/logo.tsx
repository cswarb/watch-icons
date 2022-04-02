import classNames from "classnames"

export const Logo = ({ theme }: any) => {
    return (
        <h1 className={classNames('logo',
            {
                ['logo--light']: theme === 'light',
            }
        )}>
            <span className="logo-1">Watch</span>
            <span className="logo-2">Icons</span>
        </h1>
    )
}
