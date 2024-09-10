import"./style.scss"

export function Legend(){
    return(
        <div className="legend-container">
            <div className="info">
                <span className="free"></span>
                <p>Libre</p>
            </div>
            <div className="info">
                <span className="wait"></span>
                <p>Attente</p>
            </div>
            <div className="info">
                <span className="busy"></span>
                <p>Occupe</p>
            </div>
        </div>
    )
}