const { io } = require("socket.io-client");

const socket = io("http://localhost:2000");

socket.on("connect", () => {
  console.log("Connected with socket id:", socket.id);
});

socket.on("new_blog_created", (data) => {
  console.log("🔔 New Notification:", data);
});
