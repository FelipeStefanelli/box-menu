import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BackArrow from '../components/BackArrow';
import { useCart } from '../providers/CartProvider';
import { useProduct } from '../providers/ProductProvider';
import { useRestaurant } from '../providers/RestaurantProvider';
import axios from 'axios';

function Cart(props) {
    const { cart, setCart } = useCart();
    const { restaurant, setRestaurant } = useRestaurant();
    const { product, setProduct } = useProduct();

    return (
        <motion.div
            className="payment"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            <div className='header'>
                <BackArrow to={`/restaurant/${restaurant && restaurant.id && restaurant.id}/product/${product && product.id && product.id}`} black />
                <p className='slide-in-animation'>RETIRADA</p>
            </div>
            <div className='body'>
                Hopy, meio de pagamento
                <p className='continue-button' onClick={() => props.navigate(`/payment`)}>
                    SUCESSO
                </p>
                <p className='error-button' onClick={() => document.getElementById('payment-error-modal').style.display = "block"}>
                    ERRO
                </p>
            </div>
            <div id="payment-error-modal" className="modal">
                <div className="modal-content">
                    <p>
                        Tivemos um problema com a forma de pagamento.
                    </p>
                    <div className='modal-buttons'>
                        <button onClick={() => document.getElementById('payment-error-modal').style.display = "none"}>TENTAR NOVAMENTE</button>
                        <button onClick={() => props.navigate(`/`)}>VOLTAR</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Cart;
