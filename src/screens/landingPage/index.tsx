import { NavBars } from "./components/navBars"
import { Home } from "./components/home"
import { Service } from "./components/services"
import { Footer } from "./components/footer"
import AuthUser from "../auhtentifications"

import "./style.scss"
import { useState } from "react"
import { LoginUser } from "../auhtentifications/login"

export function LandingPage(){

    const [isLogin, setLogin] = useState(false)
    const [isSign, setSign] = useState(false)

    const NavBarData = {
        logo : "Transport",
        menu : ["Acceuil", "Service", "Nos centre", "Footer"]
    }

    const homeData = {
        //title : "Itatitra",
        description : `
            Nous avons créé cette plateforme pour vous, 
            afin de vous offrir une gestion simplifiée et 
            rapide de votre coopérative, avec des services 
            garantis fiables, vous assurant ainsi une expérience 
            client optimale et un gain de temps précieux. 
        `,
        image : "/images/car.png"
    }
    const dataBox = [
        {
            info: "Fiable",
            icon: "trush",
        },
        {
            info: "Securite",
            icon: "security",
        },
        {
            info: "Rapide",
            icon: "speed",
        },
    ];

    // const footerData = {
    //     text : 
    // }


    return(
        <div className="landing-page-container">
            {isSign && <AuthUser onExit={()=>setSign(false)}/>}
            {isLogin && <LoginUser onExit={()=>setLogin(false)}/>}
            <NavBars 
                logo={NavBarData.logo} 
                menu={NavBarData.menu} 
                onLogin={()=>setLogin(true)}
                onSignin={()=>setSign(true)}
            />
            <Home 
                //title={homeData.title}
                description={homeData.description}
                image={homeData.image}
            />
            <Service
                boxData={dataBox}
            />
            
        </div>
    )
}