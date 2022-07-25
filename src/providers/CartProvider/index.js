import React, { createContext, useState } from "react";

const CartContext = createContext({});

export const CartProvider = (props) => {

    const [cart, setCart] = useState([]);

    return (
        <CartContext.Provider value={{
            setCart, cart
        }}>
            {props.children}
        </CartContext.Provider>
    )
}

export const useCart = () => React.useContext(CartContext);
