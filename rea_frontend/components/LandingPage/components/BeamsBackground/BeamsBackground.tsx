import React, { useRef } from "react";
import * as classes from "./styles";
import { useBeamsAnimation } from "./hooks";

type BeamsBackgroundProps = {
  intensity?: number;
  beams?: number;            
  quality?: 'auto'|'low'|'high';
  children?: React.ReactNode;
};

export const BeamsBackground: React.FC<BeamsBackgroundProps> = ({
  intensity = 1,
  beams = 80,
  quality = 'auto',
  children
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useBeamsAnimation(canvasRef, { intensity, beams, quality });
  return (
    <div className={classes.wrapper}>
      <canvas ref={canvasRef} className={classes.canvas} />
      <div className={classes.overlay} />
      <div className={classes.content}>{children}</div>
    </div>
  );
};

