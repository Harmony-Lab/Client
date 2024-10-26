import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

function WebCam({ onCapture = null }) {
  const webcamRef = useRef(null);

  useEffect(() => {
    if (onCapture) {
      const imageSrc = webcamRef.current.getScreenshot();
      onCapture(imageSrc);
    }
  }, [onCapture]);

  return (
    <Webcam
      audio={false}
      height={360}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width={640}
      videoConstraints={videoConstraints}
      mirrored={true}
    />
  );
}

export default WebCam;
