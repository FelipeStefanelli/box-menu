import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import BackArrow from '../components/BackArrow';
import { useCart } from '../providers/CartProvider';
import { useProduct } from '../providers/ProductProvider';
import { useRestaurant } from '../providers/RestaurantProvider';

function Cart(props) {
    const { cart, setCart } = useCart();
    const { restaurant, setRestaurant } = useRestaurant();
    const { product, setProduct } = useProduct();

    const [subTotal, setSubTotal] = useState(0);
    const [deliveryTax, setDeliveryTax] = useState(15.90);
    const [cupom, setCupom] = useState(10);
    const [groupedKeys, setGroupedKeys] = useState([]);
    const [groupedValues, setGroupedValues] = useState([]);

    useEffect(() => {
        return () => {
            let total = 0;
            if (cart && cart.length === 0 && localStorage.getItem('Cart')) {
                setCart(JSON.parse(localStorage.getItem('Cart')));
                JSON.parse(localStorage.getItem('Cart')).map(cartItem => {
                    total += cartItem.price;
                });
                setSubTotal(total);
                const groupedCart = groupBy(JSON.parse(localStorage.getItem('Cart')), 'restaurant');
                const propertyKeys = Object.keys(groupedCart);
                const propertyValues = Object.values(groupedCart);
                setGroupedKeys(propertyKeys);
                setGroupedValues(propertyValues);
            } else if(cart && cart.length !== 0) {
                cart.map(cartItem => {
                    total += cartItem.price;
                });
                setSubTotal(total);
                const groupedCart = groupBy(cart, 'restaurant');
                const propertyKeys = Object.keys(groupedCart);
                const propertyValues = Object.values(groupedCart);
                setGroupedKeys(propertyKeys);
                setGroupedValues(propertyValues);
            } else {
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
        }
    }, []);
    function groupBy(array, key) {
        return array.reduce((acc, item) => ({
            ...acc,
            [item[key]]: [...(acc[item[key]] ?? []), item],
        }), {})
    };
    const removeItem = (item) => {
        let total = 0;
        let newCart = cart.filter(cartItem => {
            if (cartItem && cartItem !== item) {
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
    }
    return (
        <motion.div
            className="cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
            <div className='header'>
                <BackArrow to={`/restaurant/${restaurant && restaurant.id && restaurant.id}/product/${product && product.id && product.id}`} black />
                <p>CARRINHO</p>
            </div>
            <div className='body'>
                {groupedKeys && groupedKeys.map((key, id) => {
                    return (
                        <div key={`grouped-${id}`}>
                            <p className='restaurant-name'>{key}</p>
                            {cart && cart.map((item, id) => {
                                if (key === item.restaurant) {
                                    return (
                                        <div className='cart-item' key={`cart-item-${id}`}>
                                            <div className='image'>
                                                <img alt='cart-item' src={item.product && item.product.image && item.product.image} />
                                                <div className='item-qntd'>{item.qntd && item.qntd}</div>
                                            </div>
                                            <div className='info'>
                                                <p>{item.product && item.product.name && item.product.name}</p>
                                                <p>
                                                    {item.checkboxs && item.checkboxs && item.checkboxs.map((additional, id) => {
                                                        if (additional.value) {
                                                            return (
                                                                <span key={`additional-${id}`}>{additional.name}</span>
                                                            )
                                                        }
                                                    })}
                                                    {item.numbers && item.numbers && item.numbers.map((additional, id) => {
                                                        if (additional.value !== '0') {
                                                            return (
                                                                <span key={`additional-${id}`}>{additional.value}x {additional.name}</span>
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
                                                        props.navigate(`restaurant/${restaurant.id}/product/${item.id}/edit`, { state: { productObject: item } });
                                                    }}>Editar</button>
                                                    <button onClick={() => removeItem(item)}>Remover</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
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
                <p className='continue'>
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
