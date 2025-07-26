import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const FaceRecognition = ({ image }) => {
  const imageRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const handleImage = async () => {
      const detections = await faceapi.detectAllFaces(
        imageRef.current,
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceLandmarks().withFaceDescriptors();

      faceapi.matchDimensions(canvasRef.current, {
        width: imageRef.current.width,
        height: imageRef.current.height,
      });

      const resized = faceapi.resizeResults(detections, {
        width: imageRef.current.width,
        height: imageRef.current.height,
      });

      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
    };

    if (image) handleImage();
  }, [image]);

  return (
    <div>
      <img ref={imageRef} src={image} alt="Captured" />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default FaceRecognition;
