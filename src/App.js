import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);

  // Load the COCO-SSD model once
  const loadModel = async () => {
    console.log("Loading COCO-SSD model...");
    modelRef.current = await cocossd.load();
    console.log("Model loaded.");
  };

  // Detect objects
  const detect = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4 &&
      modelRef.current
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set video dimensions
      video.width = videoWidth;
      video.height = videoHeight;

      // Set canvas dimensions
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections
      const predictions = await modelRef.current.detect(video);
      console.log(predictions);

      // Draw results
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, videoWidth, videoHeight);

      drawRect(predictions, ctx);
    }
  };

  // Load model and start detection loop
  useEffect(() => {
    loadModel();

    const interval = setInterval(() => {
      detect();
    }, 100); // 10 FPS

    return () => clearInterval(interval);
  }, []);

  return (
 <>   
    <iframe
  src="https://ghbtns.com/github-btn.html?user=Cedrick-KC&repo=ReactComputerVisionTemplate&type=star&count=true"
  frameborder="0"
  scrolling="0"
  width="100"
  height="20"
  title="GitHub Star"
></iframe>

    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  </>
);
}

export default App;
