import "./style.scss";

type ModalPlaceProps = {
    id ?: string;
    onConfirm: () => void;
    onExit: () => void;
};

export function ConfirmPlace({ id, onConfirm, onExit }: ModalPlaceProps) {
    return (
        <div className="confirm-place">
            <div className="modal-place">
                <div className="message">
                    <h1>Confirmer votre réservation</h1>
                    <p>Veuillez confirmer votre réservation a al place {id}.</p>
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
