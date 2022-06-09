import { ApolloClient, ApolloLink, createHttpLink, from, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: '/api/graphql',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const customHeaders = operation.getContext().hasOwnProperty("headers") ? operation.getContext().headers : {};
  console.log(customHeaders);
  operation.setContext({
    headers: {
      ...customHeaders,
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  });
  return forward(operation);
});

export default new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});
