import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../../screens/dashboard';
import { TestU } from '../../screens/dashboard/test';

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<DashboardPage/>}>
                <Route index element={<TestU />} />
            </Route>
        </Routes>
    )
}

export default DashboardRoutes
