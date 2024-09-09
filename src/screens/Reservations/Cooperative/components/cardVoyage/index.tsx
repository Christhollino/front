import { useNavigate } from "react-router-dom"
import "./style.scss"

type dataProps = {
    id : string,
    image ?: string,
    nom : string,
    adresse : string,
    depart : string,
    arrive : string
}
export function CardVoyage({id, image, nom, adresse, depart, arrive } : dataProps){
    const navigate = useNavigate()
    const onEnter = ()=>{
        navigate("/reservation/"+id)
    }
    return(
        <div className="card-voyage" onClick={onEnter}>
            <div className="image-container">
                <img src={(image) ? image : "/images/default.jpg"} alt="" />
            </div>
            <div className="informations">
                <p><strong>{nom}</strong></p>
                <p>{adresse}</p>
                <h3>{depart} - {arrive}</h3>
            </div>
        </div>
    )
}