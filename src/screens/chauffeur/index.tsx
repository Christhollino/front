import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// Style import
import './style.scss';

import Sidebar from './layout/sidebar';


/*
* @desc: Dashboard Page
*/

interface UserInfo {
    nom: string;
    spécialité: string;
}

const ChauffeurPage: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        // Vérifier si 'newconnect' est défini sur true dans le stockage local
        const isNewConnect = localStorage.getItem('itatitra') === 'true';
        if (isNewConnect) {

            setShowModal(true);
        }

        const storedUserInfo = localStorage.getItem('config');
        if (storedUserInfo) {
            const parsedUserInfo: UserInfo = JSON.parse(storedUserInfo);
            setUserInfo(parsedUserInfo);
        }
    }, []);

    const closeModal = () => {
        // Fermer le modal et définir 'newconnect' à false dans le stockage local
        setShowModal(false);
        localStorage.setItem('newconnect', 'false');
    };

    return (
        <div className="chauffeur-main">
            {/* Afficher le modal s'il est défini sur true */}
            {showModal && (
                <div className="diana-modal">
                    <div className="diana-modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="content-ct">
                            <div className="left-content">
                                <div className="demo">
                                    <div className="blur-loader">
                                        <span className="blur-loader__dot"></span>
                                        <span className="blur-loader__dot"></span>
                                        <span className="blur-loader__dot"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="right-content">
                                <h1>
                                    <span className="typewriter">Bonjour à vous {userInfo?.nom}</span>
                                </h1>
                                <p>
                                    <span>Bienvenue sur notre plateforme ! Je m'appelle Nebula, Si vous avez des questions ou besoin d'aide, n'hésitez pas à me les demander. Je suis là pour vous aider à chaque étape de votre mission.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <div className='chauffeur-container container'>
                <div className="chauf-sidebar-container">
                    <Sidebar />
                </div>

                <div className="chauffeur-content">
                    <div className="chauffeur-outlet">
                        <Outlet />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ChauffeurPage;
