import React, { useRef, useState } from "react";
import RecordRTC from "recordrtc";

const ScreenRecorder = () => {
  const videoPreviewRef = useRef(null);
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: {
        mediaSource: "screen",
      },
    });

    const options = {
      mimeType: "video/webm",
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
    };

    const newRecorder = RecordRTC(stream, options);
    newRecorder.startRecording();
    setRecorder(newRecorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    recorder.stopRecording(() => {
      const blob = recorder.getBlob();
      const url = URL.createObjectURL(blob);
      videoPreviewRef.current.src = url;
      videoPreviewRef.current.play();

      // Create a download link for the recorded video
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "recorded-video.mp4";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Reset states
      setRecorder(null);
      setIsRecording(false);
    });
  };

  return (
    <div>
      {isRecording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
      <video ref={videoPreviewRef} style={{ marginTop: "1rem" }} controls />
    </div>
  );
};

export default ScreenRecorder;
