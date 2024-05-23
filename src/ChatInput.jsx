import { gql, useMutation } from '@apollo/client';
import React from 'react';

const sendMutation = gql`
  mutation send($name: String!, $content: String!) {
    sendMessage(name: $name, content: $content) {
      id
      name
      content
    }
  }
`;

function ChatInput(){
  const [name, setName] = React.useState('');
  const [content, setContent] = React.useState('');
  const [sendMessage] = useMutation(sendMutation);
  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
      <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="content" />
      <button
        disabled={!name || !content}
        onClick={() => {
          sendMessage({
            variables: {
              name,
              content,
            },
          });
        }}>
          Send
        </button>
    </div>
  );
}

export default ChatInput;