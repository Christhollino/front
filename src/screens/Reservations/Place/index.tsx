import { useState } from "react";
import { Siege } from "./components/Siege";
import { InformationSiege } from "./components/informations";
import deco from "/icons/travel.png"
import "./style.scss";
import { ModalPlace } from "./components/modalPlace";

export function Place() {
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

    return (
        <div className="voyageur-container">
            <h1>Choisissez votre place</h1>
            <div className="all-place-container">
                {isActiveModal && (
                    <ModalPlace
                        onConfirm={submitPlace}
                        onExit={closeModal}
                    />
                )}
                <div className="informations-voyage">
                    <InformationSiege />
                    <img src={deco} alt="" />
                </div>
                <div className="informations-place">
                    <div className="siege-container">
                        <Siege onPlaceClick={getPlaceInformation} />
                    </div>
                    <div className="passager-container"></div>
                </div>
            </div>
        </div>
    );
}
