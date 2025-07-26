import React, { useRef, useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import axios from "axios";

function App() {
  const webcamRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [songData, setSongData] = useState(null);
  const [loadingSong, setLoadingSong] = useState(false);

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
        console.log("✅ Models loaded");
      } catch (err) {
        console.error("❌ Failed to load models:", err);
      }
    };
    loadModels();
  }, []);

  // Capture mood from webcam
  const captureMood = useCallback(async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4 &&
      modelsLoaded
    ) {
      const video = webcamRef.current.video;
      const detection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detection && detection.expressions) {
        const expressions = detection.expressions;
        const mood = Object.entries(expressions).sort((a, b) => b[1] - a[1])[0];
        console.log("Detected Mood:", mood[0]);

        // Fetch song from backend
        try {
          setLoadingSong(true);
          const res = await axios.get(`http://localhost:3000/song?mood=${mood[0]}`);
          setLoadingSong(false);
          if (res.data.songs && res.data.songs.length > 0) {
            setSongData(res.data.songs[0]);
          } else {
            setSongData(null);
          }
        } catch (err) {
          setLoadingSong(false);
          console.error("Error fetching song:", err);
          setSongData(null);
        }
      } else {
        console.log("No face detected");
      }
    }
  }, [modelsLoaded]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm py-4 px-4 sm:px-6 fixed top-0 w-full z-10">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-purple-800">
          🎭 Mood <span className="text-indigo-600"> Music</span>
        </h2>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 pt-24 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Webcam + Info Section */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Webcam Card */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-1">
              <Webcam
                className="rounded-xl w-full aspect-video object-cover border-2 border-indigo-200"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
            </div>

            {/* Info Card */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Live Mood Detection
                  </h1>
                  <p className="text-gray-600">
                    Your facial expressions are analyzed in real-time<br></br>
                    to create a personalized music experience.
                  </p>
                </div>
                <button
                  onClick={captureMood}
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-xl font-medium 
                    hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 
                    focus:ring-4 focus:ring-purple-200 focus:outline-none shadow-md"
                >
                  Detect My Mood
                </button>
              </div>
          </div>

          {/* Song Recommendation */}
          <div className="mt-8 sm:mt-5">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-5">
              <div className="flex items-center mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                  🎵 Your Music Match
                </h1>
              </div>

              {loadingSong ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-pulse text-gray-600">Loading your perfect track...</div>
                </div>
              ) : songData ? (
                <div className="space-y-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 break-words">
                      {songData.title}
                    </h2>
                    <p className="text-gray-600 break-words">{songData.artist}</p>

                  <audio 
                    controls autoPlay
                    className="w-full"
                    controlsList="nodownload"
                  >
                    <source src={songData.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-600">
                  No song found for this mood. Try capturing your mood again.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;


