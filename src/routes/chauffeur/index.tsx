import { Route, Routes } from 'react-router-dom';
import ChauffeurPage from '../../screens/chauffeur';
import { ChauffeurPag } from '../../screens/chauffeur/Form';

const ChauffeurRoutes = () => {
    return (
        <Routes>
            <Route path="/chauffeur" element={<ChauffeurPage/>}>
                <Route index element={<ChauffeurPag />} />
            </Route>
        </Routes>
    )
}

export default ChauffeurRoutes
