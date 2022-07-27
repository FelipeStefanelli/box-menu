import { useRestaurant } from '../providers/RestaurantProvider';
import { useCart } from '../providers/CartProvider';
import Logo from '../assets/boxmenulogo.png';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

function Restaurants(props) {
    const { setRestaurant } = useRestaurant();
    const { cart, setCart } = useCart();
    useEffect(() => {
        return () => {
            if (cart.length === 0) {
                setCart(JSON.parse(localStorage.getItem('Cart')));
            };
        }
    }, []);
    return (
        <motion.div
            className="restaurants"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            <div className='header'>
                <img src={Logo} alt='logo' width='120px' height='37px' />
                {cart && cart.length !== 0 &&
                    <div className='cart-icon black' onClick={() => props.navigate(`/cart`)} ></div>
                }
            </div>
            <div className='body'>
                <p className="title">Restaurantes</p>
                {props.restaurants && props.restaurants.map((item, id) => {
                    return (
                        <div className='cards' key={`restaurant-${id}`} onClick={() => {
                            setRestaurant(item);
                            localStorage.setItem('Restaurant', JSON.stringify(item));
                            props.navigate(`restaurant/${item.id}`);
                        }}>
                            <div className='card-image'>
                                <img src={item.image} alt='restaurant-logo' width={item.width} height={item.height} />
                            </div>
                            <p className='card-title'>{item.name}</p>
                        </div>
                    )
                })}
            </div>
        </motion.div>
    );
};

export default Restaurants;
