import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { creatSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { base_url } from '../utils/constants';
const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const user = useSelector(store => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  const fetchChatMessages = async () => {
    const chats = await axios.get(base_url + "chat/" + targetUserId, { withCredentials: true });
    console.log(chats);
    
    const chatMessages = chats?.data?.messages.map(m => {
       return { firstName: m?.senderId?.firstName, 
        lastName: m?.senderId?.lastName, 
        message: m?.message } })
    setMessages(chatMessages);
  }

  useEffect(() => {
    fetchChatMessages();
  }, [])

  useEffect(() => {
    if (!userId) return;
    const socket = creatSocketConnection();
    //as soon as page load, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", { firstName, userId, targetUserId })
    socket.on("messageReceived", ({ firstName,lastName, message }) => {
      console.log(firstName, message)
      setMessages((messages) => [...messages, { firstName,lastName, message }]);
    })
    return () => {
      socket.disconnect();
    }
  }, [userId, targetUserId])

  const sendMessage = () => {
    const socket = creatSocketConnection();
    socket.emit("sendMessage", { firstName,lastName, userId, targetUserId, message });
    setMessage("");

  }

  return (
    <div className='w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
      <h1 className='p-4 border-b border-gray-600'>Chat</h1>
      <div className='flex-1 overflow-scroll p-5'>
        {messages.map((msg, index) => {
          return (<div className={"chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start")} key={index}>
            <div className="chat-header">
              {`${msg.firstName} ${msg.lastName} `}
              <time className="text-xs opacity-50">2 hours ago</time>
            </div>
            <div className="chat-bubble">{msg.message}</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>)
        })}
      </div>
      <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
        <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} className='flex-1 border-gray-500 bg-gray-800  text-white rounded-2xl p-2' />
        <button onClick={sendMessage} className='btn btn-secondary'>Send</button></div>

    </div>
  )
}

export default Chat