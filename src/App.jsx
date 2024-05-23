import { useState } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink } from '@apollo/client';
import './App.css'

import { SubscriptionClient } from 'subscriptions-transport-ws'
import { WebSocketLink } from '@apollo/client/link/ws'
import ChatList from './ChatList.jsx';
import ChatInput from './ChatInput.jsx';

const wsLink = new WebSocketLink(
  new SubscriptionClient("ws://localhost:4000/graphql")
);

const link = ApolloLink.from([wsLink]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

function App() {
  const [duplicateChat, setDuplicateChat] = useState(false)
  const [count, setCount] = useState(2)

  return (
    <>
      <ApolloProvider client={client}>
        <label>
          number of ChatList: 
          <input type="number" value={count} onChange={(ev) => setCount(Number.parseInt(ev.target.value))} />  
        </label>
        <div>
          {
            Array.from({ length: count }).map((_, idx) => {
              return <ChatList key={idx} />
            })
          }
          
        </div>
        <ChatInput />
      </ApolloProvider>
    </>
  );
}

export default App
