import React from 'react';
import {
    Routes,
    Route,
    useLocation,
    useNavigate
} from "react-router-dom";
import Restaurants from './pages/Restaurants';
import Cardapio from './pages/Cardapio';

import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Restaurants navigate={navigate} />} />
                <Route path="/:restaurantId" element={<Cardapio navigate={navigate} />} />
                <Route path="/:productId" element={<Cardapio navigate={navigate} />} />
            </Routes>
        </AnimatePresence>
    )
};

export default AnimatedRoutes;