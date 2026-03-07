<div align="center">

<br/>

```
██████╗ ██╗   ██╗██╗     ███████╗███████╗    ██████╗██╗  ██╗ █████╗ ████████╗
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



</div>

---

## Overview

**PulseChat** is a real-time web chat application built with **Node.js**, **Express**, and **Socket.IO**. It demonstrates bidirectional WebSocket communication — enabling multiple users to exchange messages instantly, with zero page reloads.

Whether you're exploring how real-time systems work under the hood or using PulseChat as a starting point for a production-grade messaging app, it's a clean, focused reference implementation.

---

## Features

| Feature | Description |
|---|---|
| ⚡ **Real-Time Messaging** | Instant message delivery via WebSocket — no polling, no lag |
| 👥 **Live User Count** | Active connection count updates dynamically as users join/leave |
| ✍️ **Typing Indicator** | Shows when another user is composing a message |
| 🕐 **Timestamped Messages** | Every message is labeled with date and time |
| 🖥️ **Dynamic UI** | DOM updates in real time — no page refresh needed |
| 🧩 **Client-Side Rendering** | Pure JavaScript handles all live interface updates |

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
└────────────────┬────────────────────┘
                 │
    ┌────────────┴────────────┐
    ▼                         ▼
Client A                  Client B
(receives broadcast)   (receives broadcast)
```

**Message Flow:**
1. User opens the app → browser establishes a WebSocket connection
2. User sends a message → client emits event to server
3. Server receives event → broadcasts to all connected clients
4. All clients receive the event → UI updates instantly

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

Open multiple tabs or browser windows to simulate multiple users chatting in real time.

---

## Project Structure

```
pulsechat/
├── server.js          # Express server + Socket.IO event handlers
├── package.json       # Project metadata and dependencies
└── public/            # Static files served to the client
    ├── index.html     # Chat UI markup
    ├── style.css      # Styling
    └── client.js      # Socket.IO client + DOM manipulation
```

---

## Roadmap

Planned features for future releases:

- [ ] Private direct messaging between users
- [ ] User authentication (username/password)
- [ ] Message persistence with a database (e.g. MongoDB or PostgreSQL)
- [ ] Chat rooms and group conversations
- [ ] File and media sharing
- [ ] Message delivery and read receipts

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
Full Stack Developer · Node.js · React · C++

[![GitHub](https://img.shields.io/badge/GitHub-sanjay--ram07-181717?style=flat-square&logo=github)](https://github.com/sanjay-ram07)

---

<div align="center">
  <sub>Built with ❤️ using Node.js and Socket.IO</sub>
</div>


