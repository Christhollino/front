import "./style.scss"

type NavBarType = {
    logo: string;
    menu: string[];
    onSignin ?: () => void;
    onLogin ?: () => void;
}
export function NavBars({ logo, menu , onSignin,onLogin}: NavBarType) {
    const currentPage = "Acceuil";


    return(
        <header className="nav-container">
            <div className="logo">
                <p>{logo}</p>
            </div>
            <div className="menu">
                {menu.map((data, index)=>(
                    <a href="#" key={index} className={data === currentPage ? "active" : ""}>{data}</a>
                ))}
            </div>
            <div className="button-container">
                <button className="connection" onClick={onLogin}>
                    <svg className="icon" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Connection
                </button>
                <button className="connection" onClick={onSignin}>
                    <svg className="icon" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Creer un compte
                </button>
                <button className="humberger">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    )
}