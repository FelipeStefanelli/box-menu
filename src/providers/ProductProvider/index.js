import React, { createContext, useState } from "react";

const ProductContext = createContext({});

export const ProductProvider = (props) => {

    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);

    return (
        <ProductContext.Provider value={{
            setProduct, product, setProducts, products, setCategories, categories
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => React.useContext(ProductContext);
