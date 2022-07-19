import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { motion } from 'framer-motion';

const Product = (props) => {
    const [product, setProduct] = useState(null)
    const location = useLocation();

    useEffect(() => {
        return () => {
            console.log(location.state)
            setProduct(location.state.product)
        };
    }, [])
    return (
        <motion.div
            className="product"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            {product && product.category}
            {product && product.name}
            {product && product.description}
            {product && product.price}
        </motion.div>
    )
}
export default Product;