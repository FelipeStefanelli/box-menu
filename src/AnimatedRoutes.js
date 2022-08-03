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
import HopyPayment from './pages/HopyPayment';
//import OrderCreated from './pages/OrderCreated';
//import OrderDetails from './pages/OrderDetails';

import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Restaurants location={location} navigate={navigate} />} />
                <Route path="/restaurant/:restaurantId" element={<Cardapio location={location} navigate={navigate} />} />
                <Route path="/product/:productId" element={<Product location={location} navigate={navigate} />} />
                <Route path="/product/:productId/edit" element={<EditProduct location={location} navigate={navigate} />} />
                <Route path="/cart" element={<Cart location={location} navigate={navigate} />} />
                <Route path="/payment" element={<HopyPayment location={location} navigate={navigate} />} />
                {/* <Route path="/created" element={<OrderCreated location={location} navigate={navigate} />} />
                <Route path="/details" element={<OrderDetails location={location} navigate={navigate} />} /> */}
            </Routes>
        </AnimatePresence>
    )
};

export default AnimatedRoutes;