A60205222258
A full-stack URL shortener application built with React (Frontend) and Node.js/Express (Backend). 
•	Generate short URLs with optional custom shortcode
•	Set expiration time (default 30 minutes)
•	Track click stats (time, referrer)
•	Clean, user-friendly frontend
•	Local in-memory store (no database)

Tech Stack
•	Frontend: React, Tailwind CSS (if used), Axios
•	Backend: Node.js, Express, UUID, Moment.js
•	Storage: In-memory (JavaScript Map)
•	Dev Tools: Nodemon, Postman
📁 Project Structure

A60205222258/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── routes/
│   └── index.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       └── App.jsx
└── README.md

🔧 Setup Instructions
1. Clone the Repo
git clone https://github.com/Hardikchandra/A60205222258.git
cd A60205222258
2. Start the Backend
cd backend
npm install
npm run dev

Runs on http://localhost:5000
3. Start the Frontend
cd ../frontend
npm install
npm start

Runs on http://localhost:3000
📬 API Endpoints
Method	Endpoint	Description
POST	/shorturls	Create a short URL
GET	/:shortcode	Redirect to original URL
GET	/stats/:shortcode	Get URL click stats
Screenshot

<img width="432" height="591" alt="image" src="https://github.com/user-attachments/assets/9b831b3a-2583-47e2-beff-12aef59187ce" />
