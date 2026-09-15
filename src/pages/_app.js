import React from 'react';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import CartDrawer from '../components/CartDrawer';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <CartDrawer />
    </Provider>
  );
}
