import React from 'react'

// Style import
import './style.scss'
import { Outlet } from 'react-router-dom'

// layouts page
import Footer from './layouts/footer'
import Navbar from './layouts/navbar'

/*
* @desc: Main Page  
*/
const MainPage = () => {
    return (
        <div className='main-container container'>
            <Navbar/>
            <div className="main-content main-test">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}

export default MainPage