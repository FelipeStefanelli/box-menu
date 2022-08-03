import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BackArrow from '../components/BackArrow';
import CheckBoxControl from '../components/CheckBoxControl';
import NumberControl from '../components/NumberControl';
import { useRestaurant } from '../providers/RestaurantProvider';
import { useProduct } from '../providers/ProductProvider';
import { useCart } from '../providers/CartProvider';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const EditProduct = (props) => {
    const { product, setProduct } = useProduct();
    const { cart, setCart } = useCart();
    const { restaurant, setRestaurant } = useRestaurant('');

    const [productQuantity, setProductQuantity] = useState(1);
    const [productPrice, setProductPrice] = useState(0);
    const [productAdditionalsTotal, setProductAdditionalsTotal] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [editProduct, setEditProduct] = useState(null);

    const [loading, setLoading] = useState(false);

    let { productId } = useParams();

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
            if (props.location.state && props.location.state.productObject) {
                console.log('FFFFFFFFF', props.location.state.productObject);
                let total = 0;
                setProductAdditionalsTotal(props.location.state.productObject.productAdditionalsTotal);
                setEditProduct(props.location.state.productObject);
                if (props.location.state.productObject && props.location.state.productObject.qntd) {
                    setProductQuantity(props.location.state.productObject.qntd)
                };
                if (props.location.state.productObject && props.location.state.productObject.additionals) {
                    props.location.state.productObject.additionals.map((add, id) => {
                        setTimeout(() => {
                            //console.log(document.getElementById(`number-${add.additional.uuid}`))
                            document.getElementById(`number-${add.additional.uuid}`).value = add.value;
                        }, 200);
                    });
                    setTotalPrice(props.location.state.productObject.price);
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
                        <Skeleton style={{ height: '24px', marginBottom: '24px', marginTop: '32px', position: 'absolute', top: '0', zIndex: 2 }} />
                        <Skeleton style={{ height: '262px', marginBottom: '16px', position: 'absolute', top: '72px', zIndex: 2 }} />
                    </div>
                    :
                    <>
                        {editProduct && editProduct.groups && editProduct.groups.map((group, id) => {
                            //console.log('edit',editProduct);
                            if (group.additional) {
                                return (
                                    <div className='product-additionals' key={`additionals-${id}`}>
                                        <p className='title'>{group.additional.name && group.additional.name}</p>
                                        <ul>
                                            {editProduct.additionals.map((additional, id) => {
                                                if (group.additional.uuid === additional.additional.group_uuid) {
                                                    return (
                                                        <li key={`additional-${id}`}>
                                                            <p className='additional-info'>
                                                                <span>{additional.additional && additional.additional.name && additional.additional.name}</span>
                                                                <span>+ {additional.additional && additional.additional.price && additional.additional.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                                                            </p>
                                                            <NumberControl id={`number-${additional.additional && additional.additional.uuid && additional.additional.uuid}`} max={additional.additional && additional.additional.max && additional.additional.max} price={additional.additional && additional.additional.price && additional.additional.price} setProductAdditionalsTotal={(value) => setProductAdditionalsTotal(value)} productAdditionalsTotal={productAdditionalsTotal} setTotalPrice={(value) => setTotalPrice(value)} totalPrice={totalPrice} productQuantity={productQuantity} />
                                                        </li>
                                                    )
                                                }
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
                            setTotalPrice((productPrice + productAdditionalsTotal) * (productQuantity - 1));
                        }
                    }}></div>
                    <p>{productQuantity}</p>
                    <div className='plus-icon blue' onClick={() => {
                        setProductQuantity(productQuantity + 1);
                        setTotalPrice((productPrice + productAdditionalsTotal) * (productQuantity + 1));
                    }}></div>
                </div>
                <div className='add'>
                    <p>
                        <button
                            onClick={() => {
                                let numbers = [];
                                let groups = [];
                                editProduct && editProduct.groups && editProduct.groups.map(additional => {
                                    groups.push(additional);
                                    if (additional.additional && additional.additional.product_uuid === product.uuid) {
                                        additional.additional.additionals.map(item => {
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
                                let newCart = cart;
                                let id = parseInt(productId.split('-')[1]) - 1;
                                newCart.splice(id, 1, {
                                    id: productId,
                                    product,
                                    qntd: productQuantity,
                                    price: totalPrice,
                                    productAdditionalsTotal,
                                    cutlery: false,
                                    restaurant: restaurant.name && restaurant.name,
                                    additionals: numbers,
                                    groups
                                });
                                console.log('newCart', newCart);
                                setCart(newCart);
                                localStorage.setItem('Cart', JSON.stringify([...newCart]));
                                props.navigate(`cart`);
                            }}>SALVAR</button>
                        <span>{totalPrice && totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
export default EditProduct;