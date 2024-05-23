import { gql, useSubscription } from "@apollo/client";
import React from "react";

const receive = gql`
  subscription receive {
    receiveMessage{
         id
         name
         content
    }
  }
`;

function ChatList() {
  const {
    data,
    loading,
    error,
  } = useSubscription(receive);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  console.log(data);
  return (
    <div>
      <textarea value={JSON.stringify(data.receiveMessage)} readOnly />
    </div>
  )
}

export default ChatList;