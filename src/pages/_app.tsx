import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../shared/styles/theme';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import Router from 'next/router';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawer';
import 'nprogress/nprogress.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../shared/styles/styles.scss';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const delay = 500; // in milliseconds
    let timer;
    const load = () => {
      timer = setTimeout(function () {
        NProgress.start();
      }, delay);
    };
    const stop = () => {
      clearTimeout(timer);
      NProgress.done();
    };
    Router.events.on('routeChangeStart', () => load());
    Router.events.on('routeChangeComplete', () => stop());
    Router.events.on('routeChangeError', () => stop());
  }, []);
  return (
    <ChakraProvider resetCSS theme={theme}>
      <SidebarDrawerProvider>
        <ToastContainer />

        <Component {...pageProps} />
      </SidebarDrawerProvider>
    </ChakraProvider>
  );
}

export default MyApp;
