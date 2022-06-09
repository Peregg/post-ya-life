import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import client from '@app/infrastructure/graph/client';
import { ChakraProvider } from '@chakra-ui/react'
import Header from '@app/components/fragments/Header';
import StateProvider from '@app/providers';
import ModalProvider from '@app/components/fragments/Modal';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <StateProvider>
          <ModalProvider>
            <Header />
            <Component {...pageProps} />
          </ModalProvider>
        </StateProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
