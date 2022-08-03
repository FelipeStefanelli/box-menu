import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import ProviderComposer from './providers/index';
import { CartProvider } from './providers/CartProvider';
import { RestaurantProvider } from './providers/RestaurantProvider';
import { ProductProvider } from './providers/ProductProvider';
import AnimatedRoutes from './AnimatedRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ProviderComposer components={[RestaurantProvider, ProductProvider, CartProvider]}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </ProviderComposer>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
