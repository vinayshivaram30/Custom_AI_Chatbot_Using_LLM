import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios'; // Import axios for making HTTP requests

const socket = io.connect('http://localhost:3000'); // Replace with your server's URL

function Chat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    socket.on('aiMessage', (newMessage) => {
      setChatHistory([...chatHistory, newMessage]);
    });
  }, [chatHistory]);

  const sendMessage = () => {
    socket.emit('userMessage', message);
    setMessage('');
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('pdf', selectedFile);
    try {
      const response = await axios.post('http://localhost:3000/upload-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data.message);
      // Further actions based on response (like setting context)
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload}>Upload PDF</button>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <div>
        {chatHistory.map((msg, index) => <div key={index}>{msg}</div>)}
      </div>
    </div>
  );
}

export default Chat;
