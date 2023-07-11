import { ReactMediaRecorder } from "react-media-recorder";

const RecordView = () => (
  <div>
    <ReactMediaRecorder
      screen
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div>
          <p>{status}</p>
          <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
          {status === "stopped" && (
            <video src={mediaBlobUrl} controls autoPlay loop />
          )}
        </div>
      )}
      mimeType="video/webm"
    />
  </div>
);

export default RecordView;
