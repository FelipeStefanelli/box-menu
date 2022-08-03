import { useRestaurant } from '../providers/RestaurantProvider';
import { useCart } from '../providers/CartProvider';
import { useProduct } from '../providers/ProductProvider';
import Logo from '../assets/boxmenulogo.png';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Restaurants(props) {
    const { setRestaurant, restaurants, setRestaurants } = useRestaurant();
    const { setProducts, setCategories } = useProduct();
    const { cart, setCart } = useCart();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cart && cart.length === 0) {
            setCart(JSON.parse(localStorage.getItem('Cart')));
        };
        if (!restaurants) {
            getMerchants();
        };
    }, []);
    async function getMerchants() {
        setLoading(true);
        const fetchData = {
            method: 'GET',
            url: `${process.env.REACT_APP_MERCHANT_URL}/api/v1/merchants/`
        };
        try {
            const response = await axios(fetchData);
            setRestaurants(response.data.data);
            setLoading(false);
            return response;
        } catch (error) {
            setLoading(false);
            return error;
        }
    }
    return (
        <motion.div
            className="restaurants"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            <div className='header'>
                {/* <img src={Logo} alt='logo' width='120px' height='37px' /> */}
                <img src={Logo} alt='logo' width='180px' height='45px' />
                {cart && cart.length !== 0 &&
                    <div className='cart-icon black' onClick={() => props.navigate(`/cart`)} ></div>
                }
            </div>
            {loading ?
                <div className='skeleton-container restaurants'>
                    <Skeleton style={{ height: '24px', marginBottom: '14px' }} />
                    <Skeleton style={{ height: '102px', marginBottom: '8px' }} />
                    <Skeleton style={{ height: '102px', marginBottom: '8px' }} />
                    <Skeleton style={{ height: '102px', marginBottom: '8px' }} />
                    <Skeleton style={{ height: '102px', marginBottom: '8px' }} />
                    <Skeleton style={{ height: '102px', marginBottom: '8px' }} />
                    <Skeleton style={{ height: '102px', marginBottom: '8px' }} />
                </div>
                :
                <div className='body'>
                    <p className="title">Restaurantes</p>
                    {restaurants && restaurants.length !== 0 && restaurants.map((item, id) => {
                        return (
                            <div className='cards' key={`restaurant-${id}`} onClick={() => {
                                setRestaurant(item);
                                localStorage.setItem('Restaurant', JSON.stringify(item));
                                props.navigate(`restaurant/${item.uuid}`);
                            }}>
                                <div className='card-image'>
                                    <img src={item.logo} alt='restaurant-logo' width='100%' height='100%' />
                                </div>
                                <p className='card-title'>{item.name}</p>
                            </div>
                        )
                    })}
                </div>
            }
        </motion.div>
    );
};

export default Restaurants;
