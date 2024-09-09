import React, { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Redirection route importation
const Loader = lazy(() => import('./loader'));

// Principal route importation
const Main = lazy(() => import('./main'));
const Dashboard = lazy(() => import('./dashboard'));
// const Auth = lazy(() => import('./auth'));
// const Redirect = lazy(() => import('./redirect'));

// Initialize translation

// const queryClient = new QueryClient()

const RoutesConfig: React.FC = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                {/* Pages Routes */}
                <Main />
                {/* <Auth /> */}
                {/* <Redirect /> */}
                <Dashboard />
            </Suspense>
        </BrowserRouter>
    );
}

export default RoutesConfig;
