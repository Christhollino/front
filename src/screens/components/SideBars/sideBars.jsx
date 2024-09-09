import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/sidebars.css"

function SideBars(){

    useEffect(()=>{
        changeActive()
    }, [])
    
    const changeActive = ()=>{
        const allLink = document.querySelectorAll(".menu a")
        allLink.forEach(link=>{
            link.addEventListener("click", ()=>{
                allLink.forEach((other)=>{
                    other.classList.remove("active")
                })
                link.classList.add("active")
            })
        })
    }
    const disconnect = ()=>{
        localStorage.setItem("auth", false)
        window.location.reload()
    }
    return(
        <>
            <nav id="nav-container">
                <div className="logo">
                    <p>Gestion personnel</p>
                </div>
                {/* <p>Menu</p> */}
                <div className="menu">
                    <Link to="/" className="active"><i className="fa-solid fa-chart-simple"></i> Tableau de bord</Link>
                    <Link to="/post"><i className="fa-solid fa-briefcase payment"></i> Poste </Link>
                    <Link to="/personnel"><i className="fa-solid fa-user personnel"></i> Personnel</Link>
                    <Link to="/conge"><i className="fa-solid fa-door-open conge"></i> Conge </Link>


                    <hr />
                    <Link to="/carte"><i className="fa-solid fa-money-check payment"></i> Generation de carte</Link>
                    {/* <Link to="/rapport-paiment"><i className="fa-solid fa-calendar-days"></i> Rapport paiement</Link> */}

                </div>
                
                <div className="logout-btn">
                    <a href="#" onClick={disconnect}><i className="fa-solid fa-right-from-bracket"></i> Deconnecter</a>
                </div>
            </nav>
            
            
        </>        
    )
}

export default SideBars;