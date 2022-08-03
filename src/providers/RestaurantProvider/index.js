import React, { createContext, useState } from "react";

const RestaurantContext = createContext({});

export const RestaurantProvider = (props) => {

    const [restaurant, setRestaurant] = useState(null);

    const [restaurants, setRestaurants] = useState(null);

    return (
        <RestaurantContext.Provider value={{
            setRestaurant, restaurant, setRestaurants, restaurants
        }}>
            {props.children}
        </RestaurantContext.Provider>
    )
}

export const useRestaurant = () => React.useContext(RestaurantContext);
