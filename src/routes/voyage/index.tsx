import { Route, Routes } from 'react-router-dom';
import VoyagePage from '../../screens/voyage';


const VoyageRoutes = () => {
    return (
        <Routes>
            <Route path="/voyage" element={<VoyagePage/>}>
                
            </Route>
        </Routes>
    )
}

export default VoyageRoutes
