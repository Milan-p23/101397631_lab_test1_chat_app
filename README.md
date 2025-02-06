# **Real-Time Chat Application**

## **📌 Project Overview**
This is a **real-time chat application** built using **Socket.io, Express, and MongoDB**. It supports:
- **User Authentication (Signup/Login)**
- **Group Chat (Room-based Messaging)**
- **Private Chat (One-on-One Messaging)**
- **Message Persistence (MongoDB Storage)**
- **Typing Indicators**
- **User Session Management (LocalStorage)**

---

## **🛠️ Technologies Used**
### **Frontend:**
- HTML5, CSS3, Bootstrap
- JavaScript, jQuery
- Socket.io (Client-side)

### **Backend:**
- Node.js, Express.js
- MongoDB & Mongoose
- Socket.io (Server-side)

---

## **📥 Installation & Setup**
### **1️⃣ Clone the Repository**
```bash
$ git clone https://github.com/Milan-p23/101397631_lab_test1_chat_app.git
$ cd 101397631_lab_test1_chat_app
```

### **2️⃣ Install Dependencies**
```bash
$ npm install
```

### **3️⃣ Set Up Environment Variables**
Create a **.env** file inside the backend directory and add the following:
```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

### **4️⃣ Start the Server**
```bash
$ node server.js
```
✅ **Server running on** `http://localhost:3000`

### **5️⃣ Start the Frontend** (Using Live Server)
- Open `frontend/index.html` in a browser.
- Or use Live Server in VS Code.

---

## **🚀 Features Implemented**
### **✔ User Authentication**
- Signup/Login system with **password encryption** (bcryptjs).
- User sessions managed via **localStorage**.

### **✔ Group Chat (Room-Based Messaging)**
- Users can select a room (DevOps, Cloud, Sports, etc.).
- Messages are stored in **MongoDB**.

### **✔ Private Chat (One-on-One Messaging)**
- Users can initiate a **private chat** by entering the recipient’s username.
- Messages are stored in **MongoDB** with correct sender/receiver details.
- **Real-time messaging** with instant updates.

### **✔ Message Storage (MongoDB Persistence)**
- Messages (both group and private) are saved in **MongoDB**.
- Stored messages are **retrieved** when a user joins a room.

### **✔ Typing Indicator**
- Displays `User is typing...` when a user types a message.
- **Stops typing indicator** after a short delay.

### **✔ Logout Functionality**
- Users can **log out**, and sessions are cleared.

---

## **🛠 API Endpoints**
### **🔹 Authentication Routes**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/signup` | Registers a new user |
| POST | `/api/auth/login` | Logs in an existing user |

### **🔹 Chat Routes**
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/chat/messages/:room` | Fetch group chat messages |
| GET | `/api/chat/private/:from_user/:to_user` | Fetch private messages between two users |
| POST | `/api/chat/groupMessage` | Store a new group message |
| POST | `/api/chat/privateMessage` | Store a new private message |

---

## **🔧 Project Structure**
```bash
📦 studentID_lab_test1_chat_app
 ┣ 📂 backend
 ┃ ┣ 📂 config
 ┃ ┃ ┗ 📜 db.js
 ┃ ┣ 📂 models
 ┃ ┃ ┣ 📜 User.js
 ┃ ┃ ┣ 📜 GroupMessage.js
 ┃ ┃ ┗ 📜 PrivateMessage.js
 ┃ ┣ 📂 routes
 ┃ ┃ ┣ 📜 authRoutes.js
 ┃ ┃ ┗ 📜 chatRoutes.js
 ┃ ┣ 📜 server.js
 ┃ ┗ 📜 .env
 ┣ 📂 frontend
 ┃ ┣ 📂 views
 ┃ ┃ ┣ 📜 index.html
 ┃ ┃ ┣ 📜 signup.html
 ┃ ┃ ┣ 📜 login.html
 ┃ ┃ ┣ 📜 chat.html
 ┃ ┃ ┗ 📜 private_chat.html
 ┃ ┣ 📂 scripts
 ┃ ┃ ┣ 📜 auth.js
 ┃ ┃ ┣ 📜 chat.js
 ┃ ┃ ┗ 📜 private_chat.js
 ┃ ┗ 📂 assets
 ┃ ┃ ┗ 📜 dark-theme.css
 ┗ 📜 README.md
```

---

## **👨‍💻 How to Use**
### **1️⃣ User Signup & Login**
- Open `signup.html` to create an account.
- After signing up, log in through `login.html`.

### **2️⃣ Join a Chat Room**
- Select a room from the dropdown and click `Join Room`.
- Messages from the room will load automatically.

### **3️⃣ Private Chat**
- Open `private_chat.html`.
- Enter the **username** of the person you want to chat with.
- Start chatting in real-time.

### **4️⃣ Typing Indicator**
- Start typing in the message box.
- Other users in the chat will see `User is typing...`.

### **5️⃣ Logout**
- Click `Logout` to end your session.

---

## **🤝 Contributors**
- **Name** - Milan Patel
- **Professor’s Name** - Pritesh Patel

---

## **📜 License**
This project is licensed under the **MIT License**.

---


---

## **🔗 Useful Links**
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Socket.io Documentation](https://socket.io/docs/)
- [Express.js](https://expressjs.com/)

---

🚀 **Project Completed Successfully!** 🎉

