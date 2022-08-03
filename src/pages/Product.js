import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BackArrow from '../components/BackArrow';
import CheckBoxControl from '../components/CheckBoxControl';
import NumberControl from '../components/NumberControl';
import { useRestaurant } from '../providers/RestaurantProvider';
import { useProduct } from '../providers/ProductProvider';
import { useCart } from '../providers/CartProvider';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';

const Product = (props) => {
    const { product, setProduct } = useProduct();
    const { cart, setCart } = useCart();
    const { restaurant, setRestaurant } = useRestaurant('');

    const [productQuantity, setProductQuantity] = useState(1);
    const [productPrice, setProductPrice] = useState(0);
    const [productAdditionalsTotal, setProductAdditionalsTotal] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [additionals, setAdditionals] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cart && cart.length === 0) {
            setCart(JSON.parse(localStorage.getItem('Cart')));
        };
        if (!restaurant) {
            setRestaurant(JSON.parse(localStorage.getItem('Restaurant')));
        };
        if (!product) {
            var localProduct = JSON.parse(localStorage.getItem('Product'));
            setProduct(localProduct);
            setProductPrice(parseFloat(localProduct.price));
            setTotalPrice(parseFloat(localProduct.price));
        } else {
            setProductPrice(parseFloat(product.price));
            setTotalPrice(parseFloat(product.price));
        };
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 250);
        if (!product) {
            var localProduct = JSON.parse(localStorage.getItem('Product'));
            getGroups(localProduct.uuid);
        } else {
            getGroups(product.uuid);
        };
    }, []);
    async function getGroups(uuid) {
        setLoading(true);
        const fetchData = {
            method: 'GET',
            url: `${process.env.REACT_APP_MERCHANT_URL}/api/v1/merchants/products/${uuid}/groups`
        };
        try {
            const response = await axios(fetchData);
            const groups = response.data.data;
            let ids = [];
            let additionals = [];
            groups.map((item, id) => {
                item.additionals = [];
                let additional = getAdditionals(item.uuid);
                additionals.push(additional);
                Promise.all(additionals).then((request) => {
                    request && request.map(value => {
                        if (value && value.data && value.data.data && value.data.data[0] && value.data.data[0].group_uuid && item.uuid === value.data.data[0].group_uuid) {
                            item.additionals.push(value.data.data);
                            value.data.data.map(additionalId => {
                                ids.push(`number-${additionalId.uuid}`);
                            });
                            if (id + 1 === groups.length) {
                                setLoading(false);
                                setTimeout(() => {
                                    ids.map(id => {
                                        if (id && document.getElementById(id)) {
                                            document.getElementById(id).value = 0;
                                        }
                                    });
                                }, 300);
                                console.log('final', groups);
                            };
                        };
                    });
                    setAdditionals(groups);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
            return error;
        };
    };
    async function getAdditionals(uuid) {
        setLoading(true);
        const fetchData = {
            method: 'GET',
            url: `${process.env.REACT_APP_MERCHANT_URL}/api/v1/merchants/groups/${uuid}/subproducts`
        };
        try {
            const response = await axios(fetchData);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return error;
        };
    };
    return (
        product &&
        <motion.div
            className="product"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            <div className='header'>
                <BackArrow to={`/restaurant/${restaurant && restaurant.id && restaurant.id}`} />
                <div className='shadow'></div>
                <img src={product.image_path && product.image_path} alt='header' className='header-image' />
            </div>
            <div className='body'>
                <p className='product-info'>
                    <span className='title'>{product.name && product.name}</span>
                    <span className='price'><span className='from'>A partir de </span>{product.price && product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                    <span className='description'>{product.description && product.description}</span>
                </p>
                {loading ?
                    <div className='skeleton-container product'>
                        <Skeleton style={{ height: '24px', marginBottom: '16px', marginTop: '32px', position: 'absolute', top: '0', zIndex: 2 }} />
                        <Skeleton style={{ height: '75px', marginBottom: '16px', position: 'absolute', top: '72px', zIndex: 2 }} />
                        <Skeleton style={{ height: '75px', marginBottom: '16px', position: 'absolute', top: '160px', zIndex: 2 }} />
                    </div>
                    :
                    <>
                        {additionals && additionals.map((additional, id) => {
                            if (additional.additionals && additional.additionals[0] && additional.additionals[0].length !== 0) {
                                return (
                                    <div className='product-additionals' key={`additionals-${id}`}>
                                        <p className='title'>{additional.name && additional.name}</p>
                                        <ul>
                                            {additional.additionals[0].map((item, id) => {
                                                return (
                                                    <li key={`item-${id}`}>
                                                        <p className='additional-info'>
                                                            <span>{item.name && item.name}</span>
                                                            <span>+ {item.price && item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                                                        </p>
                                                        <NumberControl id={`number-${item.uuid && item.uuid}`} max={item.max} setProductAdditionalsTotal={(value) => setProductAdditionalsTotal(value)} productAdditionalsTotal={productAdditionalsTotal} setTotalPrice={(value) => setTotalPrice(value)} totalPrice={totalPrice} price={item.price} productQuantity={productQuantity} />
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )
                            }
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
                    </>
                }
            </div>
            <div className='product-finish'>
                <div className='controller'>
                    <div className='less-icon' onClick={() => {
                        if (productQuantity !== 0 && productQuantity !== 1) {
                            setProductQuantity(productQuantity - 1);
                            console.log('result', (productPrice + productAdditionalsTotal) * (productQuantity - 1));
                            setTotalPrice((productPrice + productAdditionalsTotal) * (productQuantity - 1));
                        }
                    }}></div>
                    <p>{productQuantity}</p>
                    <div className='plus-icon blue' onClick={() => {
                        setProductQuantity(productQuantity + 1);
                        console.log('result', (productPrice + productAdditionalsTotal) * (productQuantity + 1));
                        setTotalPrice((productPrice + productAdditionalsTotal) * (productQuantity + 1));
                    }}></div>
                </div>
                <div className='add'>
                    <p>
                        <button
                            disabled={loading ? true : false}
                            onClick={() => {
                                let cutlery = false;
                                // if (document.querySelector('input[name="radio-group"]:checked')) {
                                //     cutlery = document.querySelector('input[name="radio-group"]:checked').id === 'true-cutlery' ? true : false;
                                // };
                                let numbers = [];
                                let groups = [];
                                additionals && additionals.map(additional => {
                                    groups.push({
                                        additional
                                    });
                                    if (additional.product_uuid === product.uuid) {
                                        additional.additionals.map(item => {
                                            item && item.map(add => {
                                                let value = document.getElementById(`number-${add.uuid}`).value;
                                                numbers.push({
                                                    'additional': add,
                                                    'value': value,
                                                });
                                            })
                                        });
                                    };
                                });
                                if (cart && cart.length !== 0) {
                                    setCart([...cart, {
                                        id: `item-${cart.length + 1}`,
                                        product,
                                        qntd: productQuantity,
                                        price: totalPrice,
                                        productAdditionalsTotal,
                                        cutlery: cutlery,
                                        restaurant: restaurant.name && restaurant.name,
                                        additionals: numbers,
                                        groups
                                    }]);
                                    localStorage.setItem('Cart', JSON.stringify([...cart, {
                                        id: `item-${cart.length + 1}`,
                                        product,
                                        qntd: productQuantity,
                                        price: totalPrice,
                                        productAdditionalsTotal,
                                        cutlery: cutlery,
                                        restaurant: restaurant.name && restaurant.name,
                                        additionals: numbers,
                                        groups
                                    }]));
                                } else {
                                    setCart([{
                                        id: `item-1`,
                                        product,
                                        qntd: productQuantity,
                                        price: totalPrice,
                                        productAdditionalsTotal,
                                        cutlery: cutlery,
                                        restaurant: restaurant.name && restaurant.name,
                                        additionals: numbers,
                                        groups
                                    }]);
                                    localStorage.setItem('Cart', JSON.stringify([{
                                        id: `item-1`,
                                        product,
                                        qntd: productQuantity,
                                        price: totalPrice,
                                        productAdditionalsTotal,
                                        cutlery: cutlery,
                                        restaurant: restaurant.name && restaurant.name,
                                        additionals: numbers,
                                        groups
                                    }]));
                                }
                                props.navigate(`cart`);
                            }}>{loading ? "" : "ADICIONAR"}</button>
                        <span>{totalPrice && totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
export default Product;