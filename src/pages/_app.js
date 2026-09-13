import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <title>KIOT FEST 2026 | National Level Technical & Cultural Symposium</title>
        <meta
          name="description"
          content="Annual National Level Inter-College Fest at Knowledge Institute of Technology (KIOT), Salem. Hackathons, Technical Paper Presentations, Robotics, AI Workshops and Prizes."
        />
        <meta name="theme-color" content="#0a0f1d" />
      </Head>

      <div className="flex flex-col min-h-screen bg-fest-dark text-slate-100 selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full">
          <Component {...pageProps} />
        </main>
        <CartDrawer />
        <Footer />
      </div>
    </Provider>
  );
}
