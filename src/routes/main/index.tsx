// import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LandingPage } from '../../screens/landingPage';
import { Cooperative } from '../../screens/Reservations/Cooperative';
import { Place } from '../../screens/Reservations/Place';
// Pages import 

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/reservation/:id" element={<Place />} />
            <Route path="/reservation" element={<Cooperative />} />
        </Routes>
    )
}

export default MainRoutes
