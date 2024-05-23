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
      <table>
      {
        Object.keys(data.receiveMessage).map((key) => {
          const message = data.receiveMessage[key];
          console.log("🚀 -> Object.keys -> message:", message)
          return (
            <td key={Math.random()}>
              <tr>{key}</tr>
              <tr>{message}</tr>
            </td>
          );
        })
      }
      </table>
    </div>
  )
}

export default ChatList;