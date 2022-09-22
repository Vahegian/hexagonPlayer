import React, { useRef, useEffect, useState } from "react";
import { FaPlay, FaPause } from 'react-icons/fa';
import { BsSoundwave } from 'react-icons/bs';
import styles from "./Player.module.css";

function secondsToMinutes(secs: number) {
  const m = Math.floor(secs % 3600 / 60).toString().padStart(2, '0'),
    s = Math.floor(secs % 60).toString().padStart(2, '0');
  return m + ':' + s;
}

export function Player(props: { src: string }) {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [playbackTime, setPlaybackTime] = useState(secondsToMinutes(0));
  const [isPlay, setIsPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  useEffect(() => {
    let playbackUpdateInterval: NodeJS.Timer | undefined;
    playerRef.current?.addEventListener('play', (e) => {
      setIsPlay(true);
      playbackUpdateInterval && clearInterval(playbackUpdateInterval);
      playbackUpdateInterval = setInterval(() => {
        const timeSec = Math.round(playerRef.current?.currentTime || 0);
        setPlaybackTime(secondsToMinutes(timeSec));
      }, 1000)
      console.log(e);
    })

    playerRef.current?.addEventListener('pause', (e) => {
      setIsPlay(false);
      playbackUpdateInterval && clearInterval(playbackUpdateInterval);
      console.log(e);
    })
  }, [])

  const playBtnHandler = () => {
    if (playerRef.current) {
      isPlay ? playerRef.current?.pause() : playerRef.current?.play()
    }
  };

  const muteVideoHandler = () => {
    if (playerRef.current) {
      playerRef.current.muted ?
        playerRef.current.muted = false
        :
        playerRef.current.muted = true;
      setIsMuted(playerRef.current.muted)
    }
  };
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.overlay} ${styles.hexagon_cut}`}>
        <div className={`${styles.controls}`}>
          <span className={`${styles.play_btn}`}
            onClick={playBtnHandler}>
            {isPlay ? <FaPause className={`${styles.scale}`} /> : <FaPlay className={`${styles.scale}`} />}
          </span>
          <div className={`${styles.time_volume_wrapper}`}>
            <span className={`${styles.playback_time}`}>{playbackTime}</span>
            <span className={`${styles.volume_btn} ${styles.scale}`}
              onClick={muteVideoHandler}>
              <BsSoundwave size="30px" color={isMuted ? "gray" : "white"} />
            </span>
          </div>
        </div>
      </div>
      <video ref={playerRef} src={props.src} className={`${styles.video} ${styles.hexagon_cut}`}></video>
    </div>
  )
}