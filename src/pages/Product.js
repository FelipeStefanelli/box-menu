import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import { motion } from 'framer-motion';
import BackArrow from '../components/BackArrow';
import CheckBoxControl from '../components/CheckBoxControl';
import NumberControl from '../components/NumberControl';

const Product = (props) => {
    const [product, setProduct] = useState(null);
    const [productQuantity, setProductQuantity] = useState(1);
    const [productTotal, setProductTotal] = useState(0);
    const location = useLocation();
    const [restaurantId, setRestaurantId] = useState('');

    let params = useParams();

    useEffect(() => {
        return () => {
            if (params.restaurantId) {
                setRestaurantId(params.restaurantId);
            };
            if (location.state && location.state.product) {
                setProduct(location.state.product);
                setProductTotal(location.state.product.price)
            };
        };
    }, [])
    return (
        <motion.div
            className="product"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            {product &&
                <>
                    <div className='header'>
                        <BackArrow to={`/${restaurantId}`} />
                        <div className='shadow'></div>
                        <img src={product.image && product.image} alt='header' className='header-image' />
                    </div>
                    <div className='body'>
                        <p className='product-info'>
                            <span className='title'>{product.name && product.name}</span>
                            <span className='price'><span className='from'>A partir de </span>{product.price && product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
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
                                                        <span>{item.name}</span>
                                                        <span>+ {item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                                                    </p>
                                                    {additional.type === 'select' ?
                                                        <CheckBoxControl id={`checkbox-${id}`} />
                                                        : additional.type === 'number' ?
                                                            <NumberControl id={`number-${id}`} max={additional.max} />
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
                </>
            }
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
                        <button>ADICIONAR</button>
                        <span>{productTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
export default Product;