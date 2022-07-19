
import { useEffect, useState } from 'react';
import { useCart } from '../providers/CartProvider';
import { Link, useParams } from "react-router-dom";
import { motion } from 'framer-motion';
import BackArrow from '../components/BackArrow';
import SearchBar from '../components/SearchBar';
import SearchIcon from '../assets/search-icon.svg';
import Coca from '../assets/coca.png';
import Fanta from '../assets/fanta.png';
import Burguer1 from '../assets/burguer-1.png';
import Burguer2 from '../assets/burguer-2.png';
import Subway from '../assets/subway.svg';

const categories = ['Sanduíches', 'Bebidas']

const products = [
    {
        category: 'Sanduíches',
        name: 'Sanduíche 1',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore ...',
        price: 15.99,
        image: Burguer1
    },
    {
        category: 'Sanduíches',
        name: 'Sanduíche 2',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore ...',
        price: 17.99,
        image: Burguer2
    },
    {
        category: 'Bebidas',
        name: 'Fanta Laranja',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore ...',
        price: 7.99,
        image: Fanta
    },
    {
        category: 'Bebidas',
        name: 'Coca-Cola',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore ...',
        price: 8.99,
        image: Coca
    }
];

function Cardapio(props) {
    const { cart, setCart } = useCart();
    const [ restaurantId, setRestaurantId ] = useState('');

    let params = useParams();

    useEffect(() => {
        return () => {
            if (params.restaurantId) {
                setRestaurantId(params.restaurantId);
            };
        };
    }, []);
    return (
        <motion.div
            className="cardapio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            <div className='header'>
                <BackArrow to='/' />
                <div className='shadow'></div>
                <div className='logo'>
                    <img src={Subway} alt='logo' width={110} height={80} />
                </div>
            </div>
            <div className='body'>
                <p className='title'>
                    <span>Subway</span>
                    <span>Grande Plaza Shopping</span>
                    <span>Aberto agora</span>
                </p>
                <SearchBar />
                {categories.map((category, id) => {
                    return (
                        <div className='category-container' key={`category-${id}`}>
                            <p className='category-title'>{category}</p>
                            {products.map((product, id) => {
                                if (product.category === category) {
                                    return (
                                        <Link className='product-container' state={{ product }} key={`product-${id}`} to={`/${restaurantId}/${id}`} >
                                            <p className='product-info'>
                                                <span>{product.name}</span>
                                                <span>{product.description}</span>
                                                <span>{product.price}</span>
                                            </p>
                                            <img className='product-image' src={product.image} alt={product.name} />
                                        </Link>
                                    )
                                }
                            })}
                        </div>
                    )
                })}
            </div>
        </motion.div >
    );
};

export default Cardapio;