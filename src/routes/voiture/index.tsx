import { Route, Routes } from 'react-router-dom';
import VoiturePage from '../../screens/voiture';
import { VoiturePag } from '../../screens/voiture/Form';

const VoitureRoutes = () => {
    return (
        <Routes>
            <Route path="/voiture" element={<VoiturePage/>}>
                <Route index element={<VoiturePag />} />
            </Route>
        </Routes>
    )
}

export default VoitureRoutes
