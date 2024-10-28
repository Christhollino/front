import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import './style.scss';

const Sidebar: React.FC = () => {
    useEffect(() => {
        changeActive();
    }, []);

    const changeActive = () => {
        const allLink = document.querySelectorAll<HTMLAnchorElement>(".menu a");
        allLink.forEach((link) => {
            link.addEventListener("click", () => {
                allLink.forEach((other) => {
                    other.classList.remove("active");
                });
                link.classList.add("active");
            });
        });
    };

    const disconnect = () => {
        localStorage.setItem("auth", "false");
        window.location.reload();
    };
    return (
            <nav id="nav-container">
                <div className="logo">
                    <p>FyTatitra</p>
                </div>
                <div className="menu">
                    <Link to="/dashboard"><i className="fa-solid fa-chart-simple"></i> Tableau de bord</Link>
                    <Link to="/chauffeur"><i className="fa-solid fa-briefcase payment"></i> Chauffeur</Link>
                    <Link to="/voiture" className="active"><i className="fa-solid fa-user personnel"></i> Voiture</Link>
                    <Link to="/voyage"><i className="fa-solid fa-money-check payment"></i> Voyage</Link>
                    <hr />
                    
                </div>
                
                <div className="logout-btn">
                    <a href="#" onClick={disconnect}><i className="fa-solid fa-right-from-bracket"></i> Deconnecter</a>
                </div>
            </nav>
    )
};

export default Sidebar;
