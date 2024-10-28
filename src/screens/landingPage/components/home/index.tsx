import "./style.scss"

type homeProps  = {
    // title : string;
    description : string;
    image : string;
}
export function Home({description, image } : homeProps){
    return(
        <div className="home-container">
            <div className="info-container">
                <p>Bienvenu sur</p>
                <h1><span className="Fy">Fy</span><span className="tatitra">Tatitra</span></h1>
                <p>
                    {description}
                </p>
            </div>
            <div className="image-container">
                <img src={image} alt="" />
            </div>
            {/* <footer className="footer-container">
                <p>&copy; 2024 FyTatitra. Tous droits réservés.</p>
            </footer> */}
        </div>
    )
}