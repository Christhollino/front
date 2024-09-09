import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../../screens/dashboard';


const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<DashboardPage/>}>
                {/* <Route index element={<DashboardPage />} /> */}
            </Route>
        </Routes>
    )
}

export default DashboardRoutes
