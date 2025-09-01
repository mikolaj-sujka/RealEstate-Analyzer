import { useEffect, useRef } from "react";
import { Beam } from "../models";

type Beam = {
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
  gradient: CanvasGradient | null; // cache
};

type Options = {
  intensity?: number;
  beams?: number;
  quality?: "auto" | "low" | "high";
};

export function useBeamsAnimation(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  { intensity = 1, beams = 80, quality = "auto" }: Options
) {
  const beamsRef = useRef<Beam[]>([]);
  const rafRef = useRef<number>();
  const fpsSamples = useRef<number[]>([]);
  const dprRef = useRef<number>(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // --- sizing (HiDPI safe) ---
    const fitToCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2)); // cap DPR=2 (mniej pracy)
      dprRef.current = dpr;
      // reset transform zanim zmienimy skalę
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      // skala na DPI (1x w jednostkach CSS)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const baseColumns = 5;
    const createBeam = (i: number): Beam => {
      const rect = canvas.getBoundingClientRect();
      const spacing = rect.width / baseColumns;
      const column = i % baseColumns;
      const angle = -35 + Math.random() * 10;
      const hue = 220 + Math.random() * 50;
      const length = rect.height * 2.2;

      // gradient cache (stały kształt; opacity sterujemy globalAlpha)
      const g = ctx.createLinearGradient(0, 0, 0, length);
      g.addColorStop(0, `hsla(${hue},100%,50%,0)`);
      g.addColorStop(0.5, `hsla(${hue},100%,50%,1)`); // szczyt w połowie
      g.addColorStop(1, `hsla(${hue},100%,50%,0)`);

      return {
        x:
          column * spacing +
          spacing / 2 +
          (Math.random() - 0.5) * spacing * 0.5,
        y: Math.random() * rect.height * 1.5 - rect.height * 0.25,
        width: 30 + Math.random() * 70,
        length,
        angle,
        speed: 0.6 + Math.random() * 1.1, // trochę wolniej
        opacity: 0.25 + Math.random() * 0.35,
        hue,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        gradient: g,
      };
    };

    const resetBeam = (b: Beam, i: number) => {
      const rect = canvas.getBoundingClientRect();
      const spacing = rect.width / baseColumns;
      const column = i % baseColumns;
      b.y = rect.height + 100;
      b.x =
        column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      b.width = 30 + Math.random() * 70;
      b.speed = 0.6 + Math.random() * 1.1;
      b.opacity = 0.25 + Math.random() * 0.35;
      // gradient zostaje (ten sam kształt), można tylko podmienić hue co n klatek
    };

    // --- init ---
    fitToCanvas();

    // początkowa jakość
    const cores = navigator.hardwareConcurrency ?? 4;
    const dpr = dprRef.current;
    const qualityFactor =
      quality === "low"
        ? 0.6
        : quality === "high"
        ? 1.2
        : // auto: mniej belek na wysokim dpr i małej liczbie rdzeni
          Math.max(0.6, Math.min(1.1, (cores / 8) * (1.5 - (dpr - 1))));

    const targetBeams = Math.max(20, Math.round(beams * qualityFactor));
    beamsRef.current = Array.from({ length: targetBeams }, (_, i) =>
      createBeam(i)
    );

    // rysowanie – bez kosztownego ctx.filter; użyjemy mieszania „lighter”
    ctx.globalCompositeOperation = "lighter"; // glow bez blur
    let last = performance.now();

    const animate = (now: number) => {
      const dt = Math.min(50, now - last); // clamp
      last = now;

      // clear w jednostkach CSS (bo mamy transform)
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // zbieraj próbki FPS do adaptacji
      fpsSamples.current.push(1000 / (dt || 16.7));
      if (fpsSamples.current.length > 30) fpsSamples.current.shift();

      // adaptacja po sekundzie
      if (quality === "auto" && fpsSamples.current.length === 30) {
        const avg = fpsSamples.current.reduce((a, b) => a + b, 0) / 30;
        if (avg < 50 && beamsRef.current.length > 35) {
          beamsRef.current.splice(Math.floor(beamsRef.current.length * 0.25)); // redukcja ~25%
        } else if (avg > 58 && beamsRef.current.length < beams * 1.2) {
          const need = Math.min(
            15,
            Math.round(beams * 1.2 - beamsRef.current.length)
          );
          for (let i = 0; i < need; i++)
            beamsRef.current.push(createBeam(beamsRef.current.length + i));
        }
      }

      // rysuj
      for (let i = 0; i < beamsRef.current.length; i++) {
        const b = beamsRef.current[i];
        b.y -= b.speed * (dt / 16.7);
        b.pulse += b.pulseSpeed * (dt / 16.7);

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate((b.angle * Math.PI) / 180);
        ctx.fillStyle = b.gradient!;
        // moduluj tylko przez globalAlpha (tanio)
        ctx.globalAlpha = Math.max(
          0,
          Math.min(1, b.opacity * (0.8 + Math.sin(b.pulse) * 0.2) * intensity)
        );
        ctx.fillRect(-b.width / 2, 0, b.width, b.length);
        ctx.restore();

        if (b.y + b.length < -100) resetBeam(b, i);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onResize = () => {
      fitToCanvas();
      // przelicz długości i gradienty (raz)
      const rect = canvas.getBoundingClientRect();
      for (let i = 0; i < beamsRef.current.length; i++) {
        const b = beamsRef.current[i];
        b.length = rect.height * 2.2;
        const g = ctx.createLinearGradient(0, 0, 0, b.length);
        g.addColorStop(0, `hsla(${b.hue},100%,50%,0)`);
        g.addColorStop(0.5, `hsla(${b.hue},100%,50%,1)`);
        g.addColorStop(1, `hsla(${b.hue},100%,50%,0)`);
        b.gradient = g;
      }
    };

    window.addEventListener("resize", onResize, { passive: true });

    // opcjonalnie: OffscreenCanvas (progresywne ulepszenie)
    // if ('transferControlToOffscreen' in canvas) { ... } // patrz MDN

    // prefer-reduced-motion — wyłącz animację
    if (prefersReduced) {
      cancelAnimationFrame(rafRef.current!);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [canvasRef, intensity, beams, quality]);
}
