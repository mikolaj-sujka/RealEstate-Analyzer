import { useEffect, useRef } from 'react';

export type Beam = {
    x: number; y: number; width: number; length: number;
    angle: number; speed: number; opacity: number;
    hue: number; pulse: number; pulseSpeed: number;
}

export function useBeamsAnimation(
    canvasRef: React.RefObject<HTMLCanvasElement>,
    intensity: number = 1
) {
    const beamsRef = useRef<Beam[]>([]);
    const frameRef = useRef<number>(0);
    const MIN_BEAMS = 50;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Create a single beam with random navy/purple hue
        const createBeam = (i: number, total: number): Beam => {
            const angle = -35 + Math.random() * 10;
            const spacing = canvas.width / 5;
            const column = i % 5;
            const hue = 220 + Math.random() * 50; // odcień od granatowego (230) po fioletowy (280)
            return {
                x: column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5,
                y: Math.random() * canvas.height * 1.5 - canvas.height * 0.25,
                width: 30 + Math.random() * 70,
                length: canvas.height * 2.5,
                angle,
                speed: 0.8 + Math.random() * 1.2,
                opacity: 0.2 + Math.random() * 0.4,
                hue,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.03,
            };
        };

        // Reset beam position and hue
        const resetBeam = (beam: Beam, i: number, total: number) => {
            const spacing = canvas.width / 6;
            const column = i % 5;
            beam.y = canvas.height + 100;
            beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
            beam.width = 30 + Math.random() * 70;
            beam.speed = 0.8 + Math.random() * 1.2;
            beam.hue = 230 + Math.random() * 50;
            beam.opacity = 0.2 + Math.random() * 0.4;
            beam.pulse = 0;
        };

        // Resize canvas and regenerate beams
        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);

            const total = MIN_BEAMS * 2;
            beamsRef.current = Array.from({ length: total }, (_, i) => createBeam(i, total));
        };

        // Draw a single beam
        const draw = (beam: Beam) => {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);

            const currentOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * intensity;
            const grad = ctx.createLinearGradient(0, 0, 0, beam.length);
            grad.addColorStop(0, `hsla(${beam.hue}, 100%, 50%, 0)`);
            grad.addColorStop(0.5, `hsla(${beam.hue}, 100%, 50%, ${currentOpacity})`);
            grad.addColorStop(1, `hsla(${beam.hue}, 100%, 50%, 0)`);

            ctx.fillStyle = grad;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = 'blur(25px)';

            const total = beamsRef.current.length;
            beamsRef.current.forEach((beam, idx) => {
                beam.y -= beam.speed;
                beam.pulse += beam.pulseSpeed;
                if (beam.y + beam.length < -100) resetBeam(beam, idx, total);
                draw(beam);
            });

            frameRef.current = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener('resize', resize);
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(frameRef.current!);
        };
    }, [canvasRef, intensity]);
}