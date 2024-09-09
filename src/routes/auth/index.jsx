import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

// Pages import 
const LoginPage = lazy(() => import('presentation/pages/auth'));
// Content import 
const SignIn = lazy(() => import('presentation/pages/auth/modules/signin'));
const SignUp = lazy(() => import('presentation/pages/auth/modules/signup'));
const ResetPassword = lazy(() => import('presentation/pages/auth/modules/resetpassword'));
const Facial = lazy(() => import('presentation/pages/auth/modules/recFaciale'));
//Redirect import
import Loader from 'presentation/pages/redirect/loader';


const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/auth" element={<LoginPage/>}>
                <Route index element={<SignIn />} />
                <Route path='signin' element={<SignIn />} />
                <Route path='signup' element={<SignUp />} />
                <Route path='reset/password' element={<ResetPassword />} />
                <Route path='faciale' element={<Facial />} />
            </Route>
        </Routes>
    )
}

export default AuthRoutes
