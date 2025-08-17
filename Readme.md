# Face Recognition Mood Music App

A full-stack web application that detects a user's mood using facial recognition and recommends music tracks accordingly. The project is divided into two main parts: a React-based Frontend for mood detection and music playback, and a Node.js/Express Backend for song management and storage.

---

## 📁 Project Structure

```
face-recog/
  ├── Backend/         # Node.js/Express backend API
  │   ├── src/
  │   │   ├── app.js
  │   │   ├── DB/
  │   │   │   └── bd.js
  │   │   ├── Model/
  │   │   │   └── song.model.js
  │   │   ├── routes/
  │   │   │   └── song.route.js
  │   │   └── service/
  │   │       └── storage.service.js
  │   ├── server.js
  │   ├── package.json
  │   └── ...
  └── Frontend/        # React + Vite frontend
      ├── src/
      │   ├── App.jsx
      │   ├── components/
      │   │   ├── FaceRecognition.jsx
      │   │   └── WebcamCapture.jsx
      │   ├── utils/
      │   │   └── faceApiConfig.js
      │   └── ...
      ├── public/
      │   └── models/  # face-api.js models
      ├── index.html
      ├── package.json
      └── ...
```

---

## 🚀 How It Works

### 1. Mood Detection (Frontend)
- Uses the webcam to capture the user's face in real-time.
- Utilizes [face-api.js](https://github.com/justadudewhohacks/face-api.js) to detect facial expressions and infer the user's mood (e.g., happy, sad, angry, etc.).
- Sends the detected mood to the backend to fetch a matching song.

### 2. Music Recommendation (Backend)
- Exposes REST API endpoints to upload and fetch songs, each tagged with a mood.
- Stores song metadata in MongoDB and audio files in [ImageKit](https://imagekit.io/).
- Returns a song matching the detected mood to the frontend for playback.

---

## 🛠️ Tech Stack

### Frontend
- **React** (with Vite for fast development)
- **face-api.js** for face and expression detection
- **react-webcam** for webcam integration
- **Tailwind CSS** for styling
- **Axios** for API requests

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** for data storage
- **ImageKit** for audio file storage
- **Multer** for file uploads
- **CORS** and **dotenv** for environment/config management

---

## 🔗 API Endpoints

### POST `/song`
- Upload a new song with metadata (title, artist, mood) and audio file.
- Example body: `multipart/form-data` with fields `title`, `artist`, `mood`, and `audio` (file).

### GET `/song?mood={mood}`
- Fetch songs matching the given mood.
- Returns a list of songs with metadata and audio URLs.

---

## ⚙️ Setup & Run Instructions

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)
- ImageKit account (for audio storage)

### 1. Backend Setup
```bash
cd Backend
npm install
# Copy .env.example to .env and fill in Mongo_URL, publicKey, privateKey, urlEndpoint, PORT
npm run dev
```

### 2. Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

### 3. Access the App
- Open your browser and go to `http://localhost:5173` (or the port shown in the terminal).

---

## 📦 Environment Variables

### Backend (`Backend/.env`)
```
Mongo_URL=your_mongodb_connection_string
publicKey=your_imagekit_public_key
privateKey=your_imagekit_private_key
urlEndpoint=your_imagekit_url_endpoint
PORT=5000
```

---

## ✨ Features
- Real-time mood detection using webcam and face-api.js
- Automatic music recommendation based on detected mood
- REST API for song management (upload, fetch by mood)
- Audio file storage via ImageKit

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
This project is licensed under the ISC License.
