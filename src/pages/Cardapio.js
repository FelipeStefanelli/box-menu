import { useCart } from '../providers/CartProvider';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import BackArrow from '../assets/back-arrow.svg';
import SearchIcon from '../assets/search-icon.svg';
import Coca from '../assets/coca.png';
import Fanta from '../assets/fanta.png';
import Burguer1 from '../assets/burguer-1.png';
import Burguer2 from '../assets/burguer-2.png';

function Cardapio(props) {
    const { cart, setCart } = useCart();
    let params = useParams();
    useEffect(() => {
        return () => {
            console.log(params);
        }
    }, [])
    return (
        <motion.div
            className="cardapio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7 } }}
        >
            <div className='header'>
                <div></div>
                <div></div>
            </div>
        </motion.div>
    );
};

export default Cardapio;