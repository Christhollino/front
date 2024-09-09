import { useRef, useState } from "react";
import { SpinButton } from "../../components/spinButton";
import { useNavigate } from "react-router-dom";
import { usePostRequest } from "../../../hooks/useSImplePost";
import "./style.scss";

type PropsType = {
    onExit: () => void;
};

export function LoginUser({ onExit }: PropsType) {
    const mail = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const { postRequest, loading, error, response } = usePostRequest<{ token: string }>();

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        const data = {
            mail: mail.current?.value || "",
            password: password.current?.value || "",
        };

        try {
            await postRequest("http://127.0.0.1:3000/auth/login", data);
            console.log(response)
            if (response?.data?.token) {
                localStorage.setItem("itatitraToken", response.data.token);
                navigate("/reservation");
            } else {
                console.log("Token not found in response");
            }
        } catch (err) {
            console.error("Erreur pendant l'inscription", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <span className="exit" onClick={onExit}>X</span>
            <div className="overlay"></div>
            <form className="form-contain" onSubmit={handleSubmit}>
                <div className="tile">
                    <h1>Se connecter</h1>
                </div>
                <div className="input-form">
                    <img src="/icons/user.svg" />
                    <input type="text" placeholder="adresse mail" name="mail" required ref={mail} />
                </div>
                <div className="input-form">
                    <img src="/icons/lock.svg" />
                    <input type="password" placeholder="mot de passe" name="password" required ref={password} />
                </div>
                <div className="btn-container">
                    <SpinButton isLoading={loading || isLoading} />
                </div>
                {error && <div className="error-message">{error}</div>}
            </form>
            <div className="image-sign"></div>
        </div>
    );
}
