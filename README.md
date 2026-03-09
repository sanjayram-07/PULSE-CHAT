<div align="center">

<br/>

```
   ██████╗ ██╗   ██╗██╗     ███████╗███████╗     ██████╗██╗  ██╗ █████╗ ████████╗
   ██╔══██╗██║   ██║██║     ██╔════╝██╔════╝    ██╔════╝██║  ██║██╔══██╗╚══██╔══╝
   ██████╔╝██║   ██║██║     ███████╗█████╗      ██║     ███████║███████║   ██║   
   ██╔═══╝ ██║   ██║██║     ╚════██║██╔══╝      ██║     ██╔══██║██╔══██║   ██║   
   ██║     ╚██████╔╝███████╗███████║███████╗    ╚██████╗██║  ██║██║  ██║   ██║   
  ╚═╝      ╚═════╝ ╚══════╝╚══════╝╚══════╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝  
```

**Real-Time Messaging. Instant. Lightweight. Open.**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=flat-square)](https://pulse-chat-production.up.railway.app/)

</div>

---

## Overview

**PulseChat** is a real-time web chat application built with **Node.js**, **Express**, and **Socket.IO**. It supports both public group chat and **private one-to-one messaging** — users log in with a unique ID (such as a phone number or any custom identifier) and can initiate private conversations by entering another user's ID.

Whether you're exploring how real-time systems work under the hood or using PulseChat as a starting point for a production-grade messaging app, it's a clean, focused reference implementation.

---

## Features

| Feature | Description |
|---|---|
| ⚡ **Real-Time Messaging** | Instant message delivery via WebSocket — no polling, no lag |
| 🔒 **Private Messaging** | Send direct messages to any user by entering their unique login ID |
| 👥 **Live User Count** | Active connection count updates dynamically as users join/leave |
| ✍️ **Typing Indicator** | Shows when another user is composing a message (public & private) |
| 🕐 **Timestamped Messages** | Every message is labeled with date and time |
| 🖥️ **Dynamic UI** | DOM updates in real time — no page refresh needed |
| 🔑 **Flexible Login ID** | Users log in with any unique identifier — phone number, username, employee ID, etc. |

---

## Private Messaging — How It Works

When a user logs in, they provide:
- A **display name** (shown in chat)
- A **unique login ID** (e.g. a phone number, roll number, or any string assigned at registration)

To start a private chat:
1. Click **"New Private Chat"** or navigate to the DM panel
2. Enter the **login ID** of the person you want to message
3. If they are online, the message is delivered directly and privately to their socket
4. Both sender and receiver see the conversation — no one else does

> The login ID does not have to be a phone number. It can be any unique string the user registered with — a student ID, employee number, email, or custom handle.

---

## Architecture
```
┌─────────────────────────────────────┐
│           Client Browser            │
│    HTML + CSS + JavaScript (DOM)    │
└────────────────┬────────────────────┘
                 │
        WebSocket Connection
       (Socket.IO Client Library)
                 │
                 ▼
┌─────────────────────────────────────┐
│       Node.js + Express Server      │
│         (server.js entry point)     │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│             Socket.IO               │
│   Manages connections & broadcasts  │
│   Routes private messages by ID     │
└────────────────┬────────────────────┘
                 │
    ┌────────────┴────────────┐
    ▼                         ▼
Client A                  Client B
(private message sent)  (private message received)
```

**Private Message Flow:**
1. User A logs in with their unique ID → server maps `userId → socketId`
2. User A enters User B's login ID and sends a message
3. Server looks up User B's socket by their login ID
4. Message is emitted **only** to User B's socket — not broadcast
5. Both A and B see the message in their private conversation thread

---

## Tech Stack

**Frontend**
- HTML5, CSS3, Vanilla JavaScript

**Backend**
- [Node.js](https://nodejs.org/) — JavaScript runtime
- [Express.js](https://expressjs.com/) — HTTP server & static file serving
- [Socket.IO](https://socket.io/) — Real-time, bidirectional event-based communication

**Protocol**
- WebSockets (via Socket.IO abstraction)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- npm (comes bundled with Node.js)

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/sanjay-ram07/pulsechat.git

# 2. Navigate into the project
cd pulsechat

# 3. Install dependencies
npm install

# 4. Start the server
node server.js
```

### Usage

Once the server is running, open your browser and visit:
```
http://localhost:3000
```

1. Enter your **display name** and a **unique login ID** to join
2. Use the **Public Chat** to send messages to everyone
3. Navigate to **Private Chat**, enter another user's **login ID**, and start a private conversation

Open multiple tabs or browser windows to simulate multiple users.

---

## Project Structure
```
pulsechat/
├── server.js          # Express server + Socket.IO event handlers
├── package.json       # Project metadata and dependencies
└── public/            # Static files served to the client
    ├── index.html     # Landing / login page
    ├── chat.html      # Main chat UI
    ├── style.css      # Styling
    └── client.js      # Socket.IO client + DOM manipulation
```

---

## Socket Events Reference

| Event | Direction | Description |
|---|---|---|
| `login` | Client → Server | Register user with `{ userId, username }` |
| `public_message` | Client → Server | Send a message to all users |
| `private_message` | Client ↔ Server | Send/receive a DM using target's `userId` |
| `typing` | Client → Server | Emit typing status (public or private) |
| `user_list` | Server → Client | Updated list of online users |
| `user_joined` | Server → Client | Broadcast when a new user connects |
| `user_left` | Server → Client | Broadcast when a user disconnects |

---

## Roadmap

- [x] Real-time public group chat
- [x] Private direct messaging via login ID
- [x] Typing indicators (public & private)
- [ ] User authentication (password-protected login)
- [ ] Message persistence with a database (MongoDB or PostgreSQL)
- [ ] Chat rooms and group conversations
- [ ] Online/offline status indicators
- [ ] File and media sharing
- [ ] Message delivery and read receipts
- [ ] Push notifications

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please open an issue first for major changes to discuss what you'd like to change.

---

## Author

**Sanjay Ram**  
Madras Institute of Technology, Anna University  
Full Stack Developer · Node.js · Express · C++

[![GitHub](https://img.shields.io/badge/GitHub-sanjay--ram07-181717?style=flat-square&logo=github)](https://github.com/sanjay-ram07)

---

<div align="center">
  <sub>Built with ❤️ using Node.js and Socket.IO</sub>
</div>

