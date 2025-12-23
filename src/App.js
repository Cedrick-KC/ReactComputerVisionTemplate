import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";
import Footer from "Footer";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);

  const loadModel = async () => {
    console.log("Loading COCO-SSD model...");
    modelRef.current = await cocossd.load();
    console.log("Model loaded.");
  };

  const detect = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4 &&
      modelRef.current
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      video.width = videoWidth;
      video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const predictions = await modelRef.current.detect(video);

      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, videoWidth, videoHeight);

      drawRect(predictions, ctx);
    }
  };

  useEffect(() => {
    loadModel();
    const interval = setInterval(() => {
      detect();
    }, 100); // 10 FPS

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* GitHub Star Button */}
      <div className="github-star">
        <iframe
          src="https://ghbtns.com/github-btn.html?user=Cedrick-KC&repo=ReactComputerVisionTemplate&type=star&count=true"
          frameBorder="0"
          scrolling="0"
          width="120"
          height="30"
          title="GitHub Star"
        ></iframe>
      </div>

      <div className="App">
        <header className="App-header">
          <Webcam
            ref={webcamRef}
            muted={true}
            className="webcam"
          />

          <canvas
            ref={canvasRef}
            className="canvas"
          />
        </header>
      <Footer />       
      </div>
    </>
  );
}

export default App;
