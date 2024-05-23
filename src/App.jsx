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

  return (
    <>
      <ApolloProvider client={client}>
        <input type="checkbox" onChange={(ev) => setDuplicateChat(ev.target.checked)} />
        <div>
          <ChatList />
          {duplicateChat && <ChatList />}
        </div>
        <ChatInput />
      </ApolloProvider>
    </>
  );
}

export default App
