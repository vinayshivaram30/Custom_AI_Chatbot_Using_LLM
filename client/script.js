const socket = io();

const sendMessage = () => {
  const userInput = document.getElementById('userInput').value;
  socket.emit('userMessage', userInput);
  document.getElementById('userInput').value = '';
};

socket.on('aiMessage', (message) => {
  const chat = document.getElementById('chat');
  chat.innerHTML += `<div>${message}</div>`;
});
