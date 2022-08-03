import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import BackArrow from '../components/BackArrow';
import { useCart } from '../providers/CartProvider';
import { useProduct } from '../providers/ProductProvider';
import { useRestaurant } from '../providers/RestaurantProvider';
import axios from 'axios';

function Cart(props) {
    const { cart, setCart } = useCart();
    const { restaurant, setRestaurant } = useRestaurant();
    const { product, setProduct } = useProduct();

    const [subTotal, setSubTotal] = useState(0);
    const [deliveryTax, setDeliveryTax] = useState(15.90);
    const [cupom, setCupom] = useState(10);
    const [groupedKeys, setGroupedKeys] = useState([]);

    useEffect(() => {
        let total = 0;
        if (cart && cart.length === 0 && localStorage.getItem('Cart')) {
            console.log('1', JSON.parse(localStorage.getItem('Cart')))
            setCart(JSON.parse(localStorage.getItem('Cart')));
            JSON.parse(localStorage.getItem('Cart')).map(cartItem => {
                total += cartItem.price;
            });
            setSubTotal(total);
            const groupedCart = groupBy(JSON.parse(localStorage.getItem('Cart')), 'restaurant');
            const propertyKeys = Object.keys(groupedCart);
            const propertyValues = Object.values(groupedCart);
            setGroupedKeys(propertyKeys);
        } else if (cart && cart.length !== 0) {
            console.log('2', cart)
            cart.map(cartItem => {
                total += cartItem.price;
            });
            setSubTotal(total);
            const groupedCart = groupBy(cart, 'restaurant');
            const propertyKeys = Object.keys(groupedCart);
            const propertyValues = Object.values(groupedCart);
            setGroupedKeys(propertyKeys);
        } else {
            console.log('3')
            props.navigate('/');
        };
        if (!restaurant) {
            setRestaurant(JSON.parse(localStorage.getItem('Restaurant')));
        };
        if (!product) {
            setProduct(JSON.parse(localStorage.getItem('Product')));
        };
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 250);
    }, []);
    function groupBy(array, key) {
        return array.reduce((acc, item) => ({
            ...acc,
            [item[key]]: [...(acc[item[key]] ?? []), item],
        }), {})
    };
    const removeItem = (item) => {
        let total = 0;
        let newCart = cart.filter((cartItem, id) => {
            if (cartItem && cartItem !== item) {
                cartItem.id = `item-${id}`;
                return cartItem;
            }
        });
        setCart(newCart);
        localStorage.setItem('Cart', JSON.stringify(newCart));
        newCart.map(cartItem => {
            total += cartItem.price;
        });
        setSubTotal(total);
        if (newCart.length === 0) {
            props.navigate('/');
        }
    };
    async function createOrder(uuid) {
        const fetchData = {
            method: 'POST',
            url: `${process.env.REACT_APP_ORDER_URL}/api/v1/orders/${uuid && uuid}`,
            data: {
                "customer": {
                    "name": "RONALDINHO TESTE"		
                },
                "cart": [
                    {
                        "description": "SANDUBAO GIGANTE",
                        "price": "3,00",
                        "amount": 1
                    },
                    {
                        "description": "COCA COLA GELADINHA",
                        "price": "4,00",
                        "amount": 1
                    },
                    {
                        "description": "BRIGADEIRO",
                        "price": "4,00",
                        "amount": 1
                    }
                ],
                "status": "CREATED"
                
            }
        };
        try {
            const response = await axios(fetchData);
            console.log('create product', response);
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    return (
        <motion.div
            className="cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            <div className='header'>
                <BackArrow to={`/restaurant/${restaurant && restaurant.id && restaurant.id}/product/${product && product.id && product.id}`} black />
                <p className='slide-in-animation'>CARRINHO</p>
            </div>
            <div className='body'>
                {cart && cart.map((item, id) => {
                    return (
                        <div className='cart-container' key={`cart-item-${id}`}>
                            <p className='restaurant-title'>{item.restaurant}</p>
                            <div className='cart-item'>
                                <div className='image'>
                                    <img alt='cart-item' src={item.product && item.product.image_path && item.product.image_path} />
                                    <div className='item-qntd'>{item.qntd && item.qntd}</div>
                                </div>
                                <div className='info'>
                                    <p>{item.product && item.product.name && item.product.name}</p>
                                    <p>
                                        {item.additionals && item.additionals && item.additionals.map((additional, id) => {
                                            if (additional.value !== '0') {
                                                return (
                                                    <span key={`additional-${id}`}>{additional.value}x {additional.additional.name}</span>
                                                )
                                            }
                                        })}
                                        {item.cutlery &&
                                            <span key={`additional-${id}`}>Talheres inclusos</span>
                                        }
                                    </p>
                                    <p>Total {item.price && item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                    <div className='buttons'>
                                        <button onClick={() => {
                                            setProduct(item.product);
                                            localStorage.setItem('Product', JSON.stringify(item.product));
                                            props.navigate(`/product/${item.id}/edit`, { state: { productObject: item } });
                                        }}>Editar</button>
                                        <button onClick={() => removeItem(item)}>Remover</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className='more-items'>
                    <button onClick={() => document.getElementById('more-items-modal').style.display = "block"}>ADICIONAR MAIS ITENS</button>
                    <p>Você pode adicionar itens de outros restaurantes no mesmo carrinho</p>
                </div>
                <div className='payment-info'>
                    <p>Resumo de valores</p>
                    <p>
                        <span>Subtotal</span>
                        <span>{subTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                    </p>
                    <p>
                        <span>Taxa de entrega</span>
                        <span>{deliveryTax.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                    </p>
                    <p>
                        <span>Cupom</span>
                        <span>{cupom.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                    </p>
                    <p>
                        <span>Total</span>
                        <span>{(subTotal + deliveryTax - cupom).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                    </p>
                </div>
            </div>
            <div className='cart-finish'>
                <p className='total'>
                    <span>Total</span>
                    <span>{(subTotal + deliveryTax - cupom).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                </p>
                <p className='continue-button' onClick={() => props.navigate(`/payment`)}>
                    CONTINUAR
                </p>
            </div>
            <div id="more-items-modal" className="modal">
                <div className="modal-content">
                    <p>
                        Você pode adicionar mais itens deste restaurante ou de qualquer outro
                        restaurante do shopping. De onde deseja adicionar mais itens?
                    </p>
                    <div className='modal-buttons'>
                        <button onClick={() => props.navigate(`restaurant/${restaurant.id}`)}>CONTINUAR NESSE RESTAURANTE</button>
                        <button onClick={() => props.navigate(`/`)}>OUTRO RESTAURANTE</button>
                        <button onClick={() => document.getElementById('more-items-modal').style.display = "none"}>CANCELAR</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Cart;
