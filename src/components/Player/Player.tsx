import React from "react";
import styles from "./Player.module.css";

export function Player(props: {src: string}) {
  return (
    <div className={`${styles.wrapper}`}>
      <video src={props.src} className={`${styles.video}`}></video>
    </div>
  )
}