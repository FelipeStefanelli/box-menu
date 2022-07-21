import { useCart } from '../providers/CartProvider';
import Logo from '../assets/boxmenulogo.png';
import BurguerKing from '../assets/burguerking.png';
import TacoBell from '../assets/tacobell.png';
import Subway from '../assets/subway.svg';
import Bobs from '../assets/bobs.svg';
import { motion } from 'framer-motion';

const restaurants = [
    {
        id: 1,
        name: 'Burguer King',
        image: BurguerKing,
        width: 90,
        height: 70
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
]

function Restaurants(props) {
    const { cart, setCart } = useCart();

    return (
        <motion.div
            className="restaurants"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            <div className='header'>
                <img src={Logo} alt='logo' width='120px' height='37px' />
            </div>
            <div className='body'>
                <p className="title">Restaurantes</p>
                {restaurants.map((item, id) => {
                    return (
                        <div className='cards' key={`restaurant-${id}`} onClick={() => props.navigate(`/restaurant-${item.id}`)}>
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
