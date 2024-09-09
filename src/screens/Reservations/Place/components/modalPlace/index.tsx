import "./style.scss";

type ModalPlaceProps = {
    onConfirm: () => void;
    onExit: () => void;
};

export function ModalPlace({ onConfirm, onExit }: ModalPlaceProps) {
    return (
        <div className="modal-place-container">
            <div className="overlay"></div>
            <div className="modal-place">
                <div className="message">
                    <h1>Confirmer votre réservation</h1>
                    <p>Veuillez confirmer votre réservation pour pouvoir l'enregistrer.</p>
                </div>
                <div className="button-container">
                    <button className="confirme" onClick={onConfirm}>
                        Confirmer
                    </button>
                    <button className="cancel" onClick={onExit}>
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}
