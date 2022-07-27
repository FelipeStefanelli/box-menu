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
import EditProduct from './pages/EditProduct';
import Cart from './pages/Cart';

import BurguerKing from './assets/burguerking.png';
import TacoBell from './assets/tacobell.png';
import Subway from './assets/subway.svg';
import Bobs from './assets/bobs.svg';

import { AnimatePresence } from 'framer-motion';

const restaurants = [
    {
        id: 1,
        name: 'Burguer King',
        image: BurguerKing,
        width: 85,
        height: 60
    },
    {
        id: 2,
        name: 'Subway',
        image: Subway,
        width: 80,
        height: 55
    },
    {
        id: 3,
        name: "Bob's",
        image: Bobs,
        width: 70,
        height: 55
    },
    {
        id: 4,
        name: 'Taco Bell',
        image: TacoBell,
        width: 80,
        height: 55
    }
];

function AnimatedRoutes() {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Restaurants location={location} navigate={navigate} restaurants={restaurants} />} />
                <Route path="/restaurant/:restaurantId" element={<Cardapio location={location} navigate={navigate} />} />
                <Route path="/restaurant/:restaurantId/product/:productId" element={<Product location={location} navigate={navigate} />} />
                <Route path="/restaurant/:restaurantId/product/:productId/edit" element={<EditProduct location={location} navigate={navigate} restaurants={restaurants} />} />
                <Route path="/cart" element={<Cart location={location} navigate={navigate} />} />
            </Routes>
        </AnimatePresence>
    )
};

export default AnimatedRoutes;