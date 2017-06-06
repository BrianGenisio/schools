import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj3kupprxfa090179mhocdhy7'
})

const client = new ApolloClient({
  networkInterface
})

ReactDOM.render(<ApolloProvider client={client}>
    <App />
</ApolloProvider>, 
document.getElementById('root'));

registerServiceWorker();
