import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { GoArrowLeft } from "react-icons/go";

import { Siege } from "./components/Siege";
import { InformationSiege } from "./components/informations";
import deco from "/icons/travel.png"
import { ModalPlace } from "./components/modalPlace";
import { ConfirmPlace } from "./components/confirmPlace";
import { Legend } from "./components/legend";

import "./style.scss";

export function Place() {

    const navigate = useNavigate()

    const [placeId, setPlaceId] = useState<string | undefined>();
    const [isActiveModal, setActiveModal] = useState<boolean>(false);

    const getPlaceInformation = (status: string, id: string) => {
        if (status === "libre") {
            setPlaceId(id);
            setActiveModal(true);
        }
    };

    const submitPlace = () => {
        console.log("Données envoyées pour la place ", placeId);
        setActiveModal(false);
    };

    const closeModal = () => {
        setActiveModal(false);
    };
    const goBack = ()=>{
        navigate("/reservation")
    }

    return (
        <div className="voyageur-container">
            <div className="nav-bar">
                <h1>Choisissez votre place</h1>
                <span className="go-back" onClick={goBack}>
                    <GoArrowLeft />
                </span>
            </div>
            <div className="all-place-container">
                {/* {isActiveModal && (
                    <ModalPlace
                        onConfirm={submitPlace}
                        onExit={closeModal}
                    />
                )} */}
                
                <div className="informations-place">
                    <div className="siege-container">
                        <Siege onPlaceClick={getPlaceInformation} />
                    </div>
                    <div className="passager-container"></div>
                </div>
                <div className="informations-voyage">
                    <div className="legend-container">
                        <Legend />
                    </div>
                    <div className="little-info">
                        <img src={deco} alt="" />
                        <InformationSiege />
                    </div>
                    <div className="modal-place">
                    {isActiveModal && (
                        <ConfirmPlace 
                            id={placeId}
                            onConfirm={submitPlace}
                            onExit={closeModal}
                        />
                    )}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
