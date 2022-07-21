import React from 'react';
import {
    Routes,
    Route,
    useLocation,
    useNavigate
} from "react-router-dom";
import Restaurants from './pages/Restaurants';
import Cardapio from './pages/Cardapio';
import Product from './pages/Product';

import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Restaurants location={location} navigate={navigate} />} />
                <Route path="/restaurant/:restaurantId" element={<Cardapio location={location} navigate={navigate} />} />
                <Route path="/restaurant/:restaurantId/product/:productId" element={<Product location={location} navigate={navigate} />} />
            </Routes>
        </AnimatePresence>
    )
};

export default AnimatedRoutes;