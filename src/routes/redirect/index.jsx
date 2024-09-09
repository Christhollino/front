import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Pages import
import Loader from 'presentation/pages/redirect/loader';
import NotFound from 'presentation/pages/redirect/notFound';
import Error from 'presentation/pages/redirect/error';
import Unauthorized from 'presentation/pages/redirect/unauthorized';

const RedirectRoutes = () => {
    return (
        <Routes>
            <Route path="/loader" element={<Loader/>}/>
            <Route path="/not-found" element={<NotFound/>}/>
            <Route path="/unauthorized" element={<Unauthorized/>}/>
            <Route path="/error/:error" element={<Error/>}/>
        </Routes>
    )
}

export default RedirectRoutes
