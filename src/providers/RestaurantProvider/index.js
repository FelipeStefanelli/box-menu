import React, { createContext, useState } from "react";

const RestaurantContext = createContext({});

export const RestaurantProvider = (props) => {

    const [restaurant, setRestaurant] = useState(null);

    return (
        <RestaurantContext.Provider value={{
            setRestaurant, restaurant
        }}>
            {props.children}
        </RestaurantContext.Provider>
    )
}

export const useRestaurant = () => React.useContext(RestaurantContext);
