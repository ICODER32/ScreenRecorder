import React from "react";
import { ReactMediaRecorder } from "react-media-recorder";

const RecordView = () => (
  <div>
    <ReactMediaRecorder
      screen
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {
        const handleDownload = () => {
          if (mediaBlobUrl) {
            const link = document.createElement("a");
            link.href = mediaBlobUrl;
            link.download = "recorded-video.mp4";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        };

        if (status === "stopped") {
          handleDownload();
        }

        return (
          <div>
            <p>{status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            {status === "stopped" && (
              <video src={mediaBlobUrl} controls autoPlay loop />
            )}
          </div>
        );
      }}
      mimeType="video/mp4"
    />
  </div>
);

export default RecordView;
