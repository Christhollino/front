import "./style.scss"

type homeProps  = {
    title : string;
    description : string;
    image : string;
}
export function Home({ title, description, image } : homeProps){
    return(
        <div className="home-container">
            <div className="info-container">
                <p>Bienvenu sur</p>
                <h1>{title}</h1>
                <p>
                    {description}
                </p>
            </div>
            <div className="image-container">
                <img src={image} alt="" />
            </div>
        </div>
    )
}