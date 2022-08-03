
import { useEffect, useState } from 'react';
import { useRestaurant } from '../providers/RestaurantProvider';
import { useProduct } from '../providers/ProductProvider';
import { useCart } from '../providers/CartProvider';
import { motion } from 'framer-motion';
import BackArrow from '../components/BackArrow';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';

function Cardapio(props) {
    const { restaurant, setRestaurant } = useRestaurant();
    const { setProduct, setProducts, products, setCategories, categories } = useProduct();
    const { cart, setCart } = useCart();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (cart && cart.length === 0) {
            setCart(JSON.parse(localStorage.getItem('Cart')));
        };
        if (!restaurant) {
            setRestaurant(JSON.parse(localStorage.getItem('Restaurant')));
        };
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 250);
        if (!restaurant) {
            getCategories(JSON.parse(localStorage.getItem('Restaurant')).uuid);
            getProducts(JSON.parse(localStorage.getItem('Restaurant')).uuid);

        } else {
            getCategories(restaurant.uuid);
            getProducts(restaurant.uuid);
        };
    }, []);
    async function getCategories(uuid) {
        const fetchData = {
            method: 'GET',
            url: `${process.env.REACT_APP_MERCHANT_URL}/api/v1/merchants/${uuid && uuid}/categories`
        };
        try {
            const response = await axios(fetchData);
            console.log('categories', response);
            setCategories(response.data.data);
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async function getProducts(uuid) {
        const fetchData = {
            method: 'GET',
            url: `${process.env.REACT_APP_MERCHANT_URL}/api/v1/merchants/${uuid && uuid}/products`
        };
        try {
            const response = await axios(fetchData);
            console.log('products', response);
            setProducts(response.data.data);
            setLoading(false);
            return response;
        } catch (error) {
            console.log(error);
            setLoading(false);
            return error;
        }
    }
    return (
        <motion.div
            className="cardapio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            <div className='header'>
                <BackArrow to='/' />
                <div className='shadow'></div>
                <div className='logo'>
                    <img src={restaurant && restaurant.logo && restaurant.logo} alt='logo' width={70} height={70} />
                </div>
                <img src={restaurant && restaurant.background_image && restaurant.background_image} alt='header' className='header-image' />
                {cart && cart.length !== 0 &&
                    <div className='cart-icon white' onClick={() => props.navigate(`/cart`)} ></div>
                }
            </div>
            <div className='body'>
                <p className='title'>
                    <span>{restaurant && restaurant.name && restaurant.name}</span>
                    {restaurant && restaurant.is_open && restaurant.is_open ?
                        <span className='open'>Aberto agora</span>
                        :
                        <span className='closed'>Fechado no momento</span>
                    }
                </p>
                <SearchBar />
                {loading ?
                    <div className='skeleton-container cardapio'>
                        <Skeleton style={{ height: '28px', marginBottom: '24px', marginTop: '8px' }} />
                        <Skeleton style={{ height: '262px', marginBottom: '16px' }} />
                    </div>
                    :
                    categories && categories.map((category, id) => {
                        return (
                            <div className='category-container' key={`category-${id}`}>
                                <p className='category-title'>{category.name}</p>
                                {products && products.map((product, id) => {
                                    if (product.category_uuid === category.uuid) {
                                        return (
                                            <div className='product-container' key={`product-${id}`} onClick={() => {
                                                setProduct(product);
                                                localStorage.setItem('Product', JSON.stringify(product));
                                                props.navigate(`/product/${product.uuid}`);
                                            }} >
                                                <p className='product-info'>
                                                    <span>{product.name && product.name}</span>
                                                    <span>{product.description && product.description}</span>
                                                    <span>{product.price && product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                                                </p>
                                                <img className='product-image' src={product.image_path && product.image_path} alt={product.name} />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        )
                    })
                }
            </div>
        </motion.div >
    );
};

export default Cardapio;