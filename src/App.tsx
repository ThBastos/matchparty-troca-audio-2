import { useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import "./App.css";

function App() {
  const [videoID, setVideoID] = useState("91_H0BsyhBA");
  const [audioChanged, setAudioChanged] = useState(false);
  const [msgUser, setMsgUser] = useState("");
  const defaultPlayerRef = useRef<any>(null);
  const audiotPlayerRef = useRef<any>(null);

  let audioOptions: YouTubeProps["opts"] = {
    height: "1",
    width: "1",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const optsOriginal: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const changeAudioTo = async (videoId: string) => {
    const currTime =
      await defaultPlayerRef.current.internalPlayer.getCurrentTime();
    audiotPlayerRef.current.internalPlayer.loadVideoById({
      videoId: videoId,
      startSeconds: Math.round(currTime),
    });
  };

  const changeAudio = async (narrador: any) => {
    const playing =
      await defaultPlayerRef.current.internalPlayer.getPlayerState();
    setMsgUser("Trocando narrador...");
    if (playing === 1) {
      setAudioChanged(true);
      defaultPlayerRef.current.internalPlayer.mute();
      if (narrador === "galvao") changeAudioTo("TCU_wBDlJKw");
      if (narrador === "cleber") changeAudioTo("lV8WGimP9jQ");
      if (narrador === "fred") changeAudioTo("Ve4bgMZXZbQ");
      if (narrador === "original") {
        defaultPlayerRef.current.internalPlayer.unMute();
        audiotPlayerRef.current.internalPlayer.pauseVideo();
        setAudioChanged(false);
        setMsgUser("Troca finalizada.");
        setTimeout(() => {
          setMsgUser("");
        }, 3000);
      }
    } else {
      alert("Para troca de áudio o vídeo precisa estar sendo executado.");
    }
  };

  const _onPlay = (event: any) => {
    if (audioChanged) audiotPlayerRef.current.internalPlayer.playVideo();
  };

  const _onPause = (event: any) => {
    if (audioChanged) audiotPlayerRef.current.internalPlayer.pauseVideo();
  };

  const _onPlayAudio = (event: any) => {
    setMsgUser("Troca finalizada.");
    setTimeout(() => {
      setMsgUser("");
    }, 3000);
  };

  return (
    <div className="App">
      <h1>Teste troca de áudio</h1>
      <p>Usando: CRA + React + react-youtube</p>
      <div className="grid_button">
        <button onClick={() => changeAudio("galvao")}>Galvão</button>
        <button onClick={() => changeAudio("cleber")}>Cleber</button>
        <button onClick={() => changeAudio("fred")}>Fred</button>
        <button onClick={() => changeAudio("original")}>Original</button>
      </div>
      <YouTube
        videoId={videoID}
        opts={audioOptions}
        className="video-um"
        ref={audiotPlayerRef}
        onPlay={_onPlayAudio}
      />
      <div className="separate">{msgUser}</div>
      <div id="video_original">
        <YouTube
          videoId="91_H0BsyhBA"
          opts={optsOriginal}
          ref={defaultPlayerRef}
          onPlay={_onPlay}
          onPause={_onPause}
        />
      </div>
    </div>
  );
}

export default App;
