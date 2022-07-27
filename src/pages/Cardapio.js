
import { useEffect } from 'react';
import { useRestaurant } from '../providers/RestaurantProvider';
import { useProduct } from '../providers/ProductProvider';
import { useCart } from '../providers/CartProvider';
import { motion } from 'framer-motion';
import BackArrow from '../components/BackArrow';
import SearchBar from '../components/SearchBar';
import Coca from '../assets/coca.png';
import Fanta from '../assets/fanta.png';
import Burguer1 from '../assets/burguer-1.png';
import Burguer2 from '../assets/burguer-2.png';
import HeaderImage from '../assets/cardapio-header.png';

const categories = ['Sanduíches', 'Bebidas']

const products = [
    {
        id: 'p-1',
        category: 'Sanduíches',
        name: 'Sanduíche 1',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore ...',
        price: 15.99,
        image: Burguer2,
        additionals: [
            {
                name: 'Adicionais',
                type: 'select',
                text: 'Escolha até dois',
                max: 2,
                items: [
                    {
                        name: 'Adicional 01',
                        price: 1.00
                    },
                    {
                        name: 'Adicional 02',
                        price: 2.00
                    },
                    {
                        name: 'Adicional 03',
                        price: 3.00
                    }
                ]
            },
            {
                name: 'Molhos',
                type: 'number',
                text: 'Escolha um',
                max: 1,
                items: [
                    {
                        name: 'Molho 01',
                        price: 1.00
                    },
                    {
                        name: 'Molho 02',
                        price: 2.00
                    }
                ]
            }
        ],
        cutlery: true
    },
    {
        id: 'p-2',
        category: 'Sanduíches',
        name: 'Sanduíche 2',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore ...',
        price: 17.99,
        image: Burguer1,
        additionals: [
            {
                name: 'Adicionais',
                type: 'select',
                text: 'Escolha até dois',
                max: 2,
                items: [
                    {
                        name: 'Adicional 01',
                        price: 1.00
                    },
                    {
                        name: 'Adicional 02',
                        price: 2.00
                    },
                    {
                        name: 'Adicional 03',
                        price: 3.00
                    }
                ]
            },
            {
                name: 'Molhos',
                type: 'number',
                text: 'Escolha um',
                max: 2,
                items: [
                    {
                        name: 'Molho 01',
                        price: 1.00
                    },
                    {
                        name: 'Molho 02',
                        price: 2.00
                    }
                ]
            }
        ],
        cutlery: true
    },
    {
        id: 'p-3',
        category: 'Bebidas',
        name: 'Fanta Laranja',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore ...',
        price: 7.99,
        image: Fanta,
        cutlery: false
    },
    {
        id: 'p-4',
        category: 'Bebidas',
        name: 'Coca-Cola',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore ...',
        price: 8.99,
        image: Coca,
        cutlery: false
    }
];

function Cardapio(props) {
    const { restaurant, setRestaurant } = useRestaurant();
    const { product, setProduct } = useProduct();
    const { cart, setCart } = useCart();
    useEffect(() => {
        return () => {
            if (cart && cart.length === 0) {
                setCart(JSON.parse(localStorage.getItem('Cart')));
            };
            if (!restaurant) {
                setRestaurant(JSON.parse(localStorage.getItem('Restaurant')));
            };
            if (!product) {
                setProduct(JSON.parse(localStorage.getItem('Product')));
            }
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 250);
        }
    }, []);
    return (
        <motion.div
            className="cardapio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
            <div className='header'>
                <BackArrow to='/' />
                <div className='shadow'></div>
                <div className='logo'>
                    <img src={restaurant && restaurant.image && restaurant.image} alt='logo' width={90} height={70} />
                </div>
                <img src={HeaderImage} alt='header' className='header-image' />
                {cart && cart.length !== 0 &&
                    <div className='cart-icon white' onClick={() => props.navigate(`/cart`)} ></div>
                }
            </div>
            <div className='body'>
                <p className='title'>
                    <span>{restaurant && restaurant.name && restaurant.name}</span>
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
                                        <div className='product-container' key={`product-${id}`} onClick={() => {
                                            setProduct(product);
                                            localStorage.setItem('Product', JSON.stringify(product));
                                            props.navigate(`restaurant/${restaurant.id}/product/${product.id}`);
                                        }} >
                                            <p className='product-info'>
                                                <span>{product.name}</span>
                                                <span>{product.description}</span>
                                                <span>{product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                                            </p>
                                            <img className='product-image' src={product.image} alt={product.name} />
                                        </div>
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