import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BackArrow from '../components/BackArrow';
import CheckBoxControl from '../components/CheckBoxControl';
import NumberControl from '../components/NumberControl';
import { useRestaurant } from '../providers/RestaurantProvider';
import { useProduct } from '../providers/ProductProvider';
import { useCart } from '../providers/CartProvider';
import { useParams } from 'react-router-dom';


const Product = (props) => {
    const { product, setProduct } = useProduct();
    const { cart, setCart } = useCart();
    const { restaurant, setRestaurant } = useRestaurant('');

    const [productQuantity, setProductQuantity] = useState(1);
    const [productTotal, setProductTotal] = useState('');

    let { productId } = useParams();

    useEffect(() => {
        if (cart.length === 0) {
            setCart(JSON.parse(localStorage.getItem('Cart')));
        };
        if (!restaurant) {
            setRestaurant(JSON.parse(localStorage.getItem('Restaurant')));
        };
        if (!product) {
            var localProduct = JSON.parse(localStorage.getItem('Product'));
            setProduct(localProduct);
            setProductTotal(localProduct.price);
        } else {
            setProductTotal(product.price);
        };
        setTimeout(() => {
            if (props.location.state && props.location.state.productObject) {
                console.log(props.location.state.productObject);
                if (props.location.state.productObject && props.location.state.productObject.qntd) {
                    setProductQuantity(props.location.state.productObject.qntd)
                };
                if (props.location.state.productObject && props.location.state.productObject.cutlery) {
                    document.getElementById('true-cutlery').checked = true;
                };
                if (props.location.state.productObject && props.location.state.productObject.checkboxs) {
                    props.location.state.productObject.checkboxs.map((checkbox, id) => {
                        if (checkbox.value === true) {
                            setTimeout(() => {
                                document.getElementById(`checkbox-${id}`).checked = true;
                            }, 100);
                        };
                    });
                };
                if (props.location.state.productObject && props.location.state.productObject.numbers) {
                    props.location.state.productObject.numbers.map((number, id) => {
                        if (number.value !== '0') {
                            console.log(number.value)
                            document.getElementById(`number-${id}`).value = number.value;
                        };
                    });
                };
            };
            window.scrollTo(0, 0);
        }, 250);
    }, []);

    return (
        product &&
        <motion.div
            className="product"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
            <div className='header'>
                <BackArrow to={`/restaurant/${restaurant && restaurant.id && restaurant.id}`} />
                <div className='shadow'></div>
                <img src={product.image && product.image} alt='header' className='header-image' />
                {/* {cart.length &&
                    <div className='cart-icon white' onClick={() => props.navigate(`/cart`)} ></div>
                } */}
            </div>
            <div className='body'>
                <p className='product-info'>
                    <span className='title'>{product.name && product.name}</span>
                    <span className='price'><span className='from'>A partir de </span>{product.price && product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                    <span className='description'>{product.description && product.description}</span>
                </p>
                {product.additionals && product.additionals.map((additional, id) => {
                    return (
                        <div className='product-additionals' key={`additionals-${id}`}>
                            <p className='title'>{additional.name}</p>
                            <p className='options'>{additional.text}</p>
                            <ul>
                                {additional.items.map((item, id) => {
                                    return (
                                        <li key={`item-${id}`}>
                                            <p className='additional-info'>
                                                <span>{item.name && item.name}</span>
                                                <span>+ {item.price && item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                                            </p>
                                            {additional.type === 'select' ?
                                                <CheckBoxControl id={`checkbox-${id}`} setProductTotal={(value) => setProductTotal(value)} productTotal={productTotal} price={item.price} />
                                                : additional.type === 'number' ?
                                                    <NumberControl id={`number-${id}`} max={additional.max} setProductTotal={(value) => setProductTotal(value)} productTotal={productTotal} price={item.price} />
                                                    :
                                                    <></>
                                            }
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
                {product.cutlery &&
                    <div className='cutlery'>
                        <p className='title'>Deseja talheres?</p>
                        <ul>
                            <li>
                                <p>
                                    <span>Sim, preciso de talheres</span>
                                    <span>+ R$00,00</span>
                                </p>
                                <div>
                                    <input className='input-radio' type="radio" id="true-cutlery" name="radio-group" />
                                    <label htmlFor="true-cutlery"></label>
                                </div>
                            </li>
                            <li>
                                <p>Não preciso de talheres</p>
                                <div>
                                    <input className='input-radio' type="radio" id="false-cutlery" name="radio-group" defaultChecked />
                                    <label htmlFor="false-cutlery"></label>
                                </div>
                            </li>
                        </ul>
                    </div>
                }
                <p className='title mt-32'>Observações</p>
                <textarea
                    className='text-area'
                    placeholder="Exemplo: Quero sem cebola"
                    role="textbox"
                    aria-autocomplete="list"
                    aria-haspopup="true"
                />
            </div>
            <div className='product-finish'>
                <div className='controller'>
                    <div className='less-icon' onClick={() => {
                        if (productQuantity !== 0) {
                            setProductQuantity(productQuantity - 1);
                            setProductTotal(product.price * (productQuantity - 1));
                        }
                    }}></div>
                    <p>{productQuantity}</p>
                    <div className='plus-icon blue' onClick={() => {
                        setProductQuantity(productQuantity + 1);
                        setProductTotal(product.price * (productQuantity + 1));
                    }}></div>
                </div>
                <div className='add'>
                    <p>
                        <button onClick={() => {
                            let numbers = [];
                            let checkboxs = [];
                            product.additionals && product.additionals.map(additional => {
                                additional.items.map((item, id) => {
                                    if (additional.type === 'select') {
                                        let value = document.getElementById(`checkbox-${id}`).checked;
                                        checkboxs.push({
                                            'name': item.name,
                                            'value': value
                                        });
                                    } else {
                                        let value = document.getElementById(`number-${id}`).value;
                                        numbers.push({
                                            'name': item.name,
                                            'value': value
                                        });
                                    };
                                });
                            });
                            let cutlery = false;
                            if (document.querySelector('input[name="radio-group"]:checked')) {
                                cutlery = document.querySelector('input[name="radio-group"]:checked').id === 'true-cutlery' ? true : false;
                            };
                            let newCart = cart.filter(item => {
                                if (item.id !== productId) {
                                    return item;
                                }
                            });
                            let id = parseInt(productId.split('-')[1]) - 1;
                            newCart.splice(id, 0, {
                                id: productId,
                                product,
                                qntd: productQuantity,
                                price: productTotal,
                                checkboxs: [...checkboxs],
                                numbers: [...numbers],
                                cutlery: cutlery
                            });
                            console.log('newCart', newCart);
                            setCart(newCart);
                            localStorage.setItem('Cart', JSON.stringify([...newCart]));
                            props.navigate(`cart`);
                        }}>SALVAR</button>
                        <span>{productTotal && productTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
export default Product;