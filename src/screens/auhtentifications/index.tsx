import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { SpinButton } from "../components/spinButton";
import { useNavigate } from "react-router-dom";
import { usePostRequest } from "../../hooks/usePostData";
import { clientData,cooperativeData } from "./dataInputs";

import "./style.scss";

type propsType = {
    onExit ?: ()=> void; 
}


function AuthUser({ onExit } : propsType) {
    const [isClient, setIsClient] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const inputRefs = useRef<HTMLDivElement[]>([]);
    const { postRequest, loading, error, response } = usePostRequest<{ token: string }>();

    const navigate = useNavigate()


    const inputData = isClient ? clientData : cooperativeData;

    useEffect(() => {
        if (inputRefs.current) {
            gsap.to(inputRefs.current.filter(ref => ref), { opacity: 0, y: -20, duration: 0 });
            gsap.to(inputRefs.current.filter(ref => ref), {
                opacity: 1,
                y: 0,
                duration: 0.2,
                stagger: 0.2
            });
        }
    }, [isClient]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const inputForm = inputRefs.current[index];
        if (inputForm) {
            if (event.target.value === "" || event.target.validity.valid) {
                inputForm.style.border = "none";
                inputForm.style.background = "#fff";
            } else {
                inputForm.style.border = "2px solid red";
                inputForm.style.background = "#ff0000c6";
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
    
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const data: any = Object.fromEntries(formData.entries());
        data.role = isClient ? "CLIENT" : "COOPERATIVE";

        //console.log("Données envoyées au serveur:", data);
    
        try {
            await postRequest('http://127.0.0.1:3000/auth/signup', data);
    
            if (response?.data?.token) {
                // console.log("Token:", response.data.token);
                localStorage.setItem('itatitraToken', response.data.token);
                navigate("/reservation")
            } else {
                console.log("Token not found in response");
            }
        } catch (err) {
            console.error('Erreur pendant l\'inscription', err);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="login-container">
            <div className="auth-contain">
                <div className="form-contain">
                    <div className={"choise " + (!isClient ? "active" : "")}>
                        <span className="client-option" onClick={() => setIsClient(true)}>Client</span>
                        <span className="cooperative-option" onClick={() => setIsClient(false)}>Cooperative</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="group-inputs">
                        {inputData.slice(0,2).map((data, index)=>(
                            
                                <div className="input-form" key={index} ref={el => { if (el) inputRefs.current[index] = el; }}>
                                    <img src={"/icons/" + data.icon} alt="" />
                                    <input
                                        type={data.type}
                                        placeholder={data.placeholder}
                                        name={data.name}
                                        required={data.required}
                                        pattern={data.pattern}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                </div>
                        ))}
                        </div>
                        {inputData.slice(2,inputData.length).map((data, index) => (
                            <div className="input-form" key={index} ref={el => { if (el) inputRefs.current[index] = el; }}>
                                <img src={"/icons/" + data.icon} alt="" />
                                <input
                                    type={data.type}
                                    placeholder={data.placeholder}
                                    name={data.name}
                                    required={data.required}
                                    pattern={data.pattern}
                                    onChange={(e) => handleInputChange(e, index)}
                                />
                            </div>
                        ))}
                        <div className="btn-container">
                            <SpinButton isLoading={loading || isLoading} />
                        </div>
                        {error && <div className="error-message">{error}</div>}
                    </form>
                </div>
                <div className="image-representation">
                    <span className="exit-screen" onClick={onExit}>X</span>
                    <div className={"all-image" + (isClient ? " active" : "")}>
                        <div className="client">
                            <img src="/images/login/car.jpg" alt="" />
                        </div>
                        <div className="client">
                            <img src="/images/login/traveler.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthUser;
