import { NavBars } from "./components/navBars"
import { Home } from "./components/home"
import { Service } from "./components/services"
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
        title : "Itatitra",
        description : `
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
            Dolorem explicabo nesciunt velit harum voluptatum praesentium, 
            tenetur totam natus inventore distinctio iste voluptatem? At id facilis 
            temporibus quas magnam. Minima soluta deleniti repellendus vero eos. 
            Aut incidunt consectetur ullam veniam ducimus officiis obcaecati cupiditate 
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
                title={homeData.title}
                description={homeData.description}
                image={homeData.image}
            />
            <Service
                boxData={dataBox}
            />
            
        </div>
    )
}