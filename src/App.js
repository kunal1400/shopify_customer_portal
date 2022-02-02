import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink
} from "@apollo/client";

import ThemeLayout from './Theme-Layout';
import './App.css';

const httpLink = new HttpLink({
  uri: `https://${process.env.REACT_APP_STORE_NAME}.myshopify.com/api/2022-01/graphql.json`
})

const authLink = new ApolloLink((operation, forward) => {  
  operation.setContext({
    headers: {
      'X-Shopify-Storefront-Access-Token': `${process.env.REACT_APP_API_STORE_FRONT_TOKEN}`
    }
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeLayout />
    </ApolloProvider>    
  );
}

export default App;
