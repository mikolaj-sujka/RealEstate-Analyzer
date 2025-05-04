"use client";
import { Center, Loader } from "@mantine/core";
import { FC, useState, useEffect } from "react";
import { SplashScreenProps } from "@/models/splashscreen";

export const SplashScreen: FC<SplashScreenProps> = ({
  children,
  duration = 500,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, duration);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [duration]);

  if (visible) {
    return (
      <Center
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#040813",
          zIndex: 9999,
        }}
      >
        <Loader
          size={70} 
          color="#D4AF37" 
          variant="oval"
        />
      </Center>
    );
  }

  return <>{children}</>;
};
