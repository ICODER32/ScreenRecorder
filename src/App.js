import React, { useRef } from "react";
import { createRef } from "react";
import RecordRTC from "recordrtc";

const ScreenRecorder = () => {
  const videoRef = useRef(null);
  const screenStreamRef = createRef();
  const audioStreamRef = createRef();

  const startRecording = async () => {
    const mediaDevices = navigator.mediaDevices;
    if (!mediaDevices.getDisplayMedia || !mediaDevices.getUserMedia) {
      alert("Screen recording is not supported in this browser");
      return;
    }

    try {
      const screenStream = await mediaDevices.getDisplayMedia({ video: true });
      screenStreamRef.current = RecordRTC(screenStream, {
        type: "video",
      });

      const audioStream = await mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = RecordRTC(audioStream, {
        type: "audio",
      });

      screenStreamRef.current.startRecording();
      audioStreamRef.current.startRecording();

      const combinedStream = new MediaStream();
      combinedStream.addTrack(screenStream.getTracks()[0]);
      combinedStream.addTrack(audioStream.getTracks()[0]);

      videoRef.current.srcObject = combinedStream;
    } catch (error) {
      console.error("Error accessing screen or audio stream:", error);
    }
  };

  const stopRecording = () => {
    screenStreamRef.current.stopRecording(() => {
      audioStreamRef.current.stopRecording(() => {
        const screenBlob = screenStreamRef.current.getBlob();
        const audioBlob = audioStreamRef.current.getBlob();

        const mergedBlob = new Blob([screenBlob, audioBlob], {
          type: "video/webm",
        });

        const videoUrl = URL.createObjectURL(mergedBlob);
        videoRef.current.srcObject = null;
        videoRef.current.src = videoUrl;
        videoRef.current.play();
      });
    });
  };

  return (
    <div>
      <video ref={videoRef} width="640" height="480" controls></video>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
    </div>
  );
};

export default ScreenRecorder;
