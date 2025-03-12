import React, { useState } from 'react'
import { useParams } from 'react-router'

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([{text: "hello world"}]);
  return (
    <div className='w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
      <h1 className='p-4 border-b border-gray-600'>Chat</h1>
      <div className='flex-1 overflow-scroll p-5'>
        {messages.map((msg, index) => {
          return (<div class="chat chat-start" key={index}>
            <div class="chat-header">
              Obi-Wan Kenobi
              <time class="text-xs opacity-50">2 hours ago</time>
            </div>
            <div class="chat-bubble">{msg.text}</div>
            <div class="chat-footer opacity-50">Seen</div>
          </div>)
        })}
      </div>
      <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
        <input type='text' className='flex-1 border-gray-500 bg-gray-800  text-white rounded-2xl p-2' /><button className='btn btn-secondary'>Send</button></div>

    </div>
  )
}

export default Chat