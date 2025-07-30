import React, { useRef } from "react";
import * as classes from "./styles";
import { useBeamsAnimation } from "./hooks";

export type Beam = {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

type BeamsBackgroundProps = {
  intensity?: number;
  children?: React.ReactNode;
}

export const BeamsBackground: React.FC<BeamsBackgroundProps> = ({
  intensity = 1,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useBeamsAnimation(canvasRef, intensity);

  return (
    <div className={classes.wrapper}>
      <canvas ref={canvasRef} className={classes.canvas} />
      <div className={classes.overlay} />
      <div className={classes.content}>{children}</div>
    </div>
  );
};
