import React, { useEffect } from 'react';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { hydrateCart } from '../redux/slices/cartSlice';
import { loadState } from '../redux/localStorage';
import CartDrawer from '../components/CartDrawer';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Safely hydrate cart from localStorage on the client after initial mount
    const savedState = loadState();
    if (savedState && savedState.cart) {
      store.dispatch(hydrateCart(savedState.cart));
    }
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <CartDrawer />
    </Provider>
  );
}
