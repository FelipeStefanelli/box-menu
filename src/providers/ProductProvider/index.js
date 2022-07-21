import React, { createContext, useState } from "react";

const ProductContext = createContext({});

export const ProductProvider = (props) => {

    const [product, setProduct] = useState(null);

    return (
        <ProductContext.Provider value={{
            setProduct, product
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => React.useContext(ProductContext);
