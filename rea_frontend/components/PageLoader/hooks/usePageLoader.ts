import { useState, useEffect } from "react";

export const usePageLoader = () => {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState("Inicjalizacja...");

    useEffect(() => {
        const texts = [
            "Inicjalizacja...",
            "Ładowanie danych rynkowych...",
            "Analiza trendów...",
            "Przygotowywanie wykresów...",
            "Już prawie gotowe...",
        ];

        let textIndex = 0;
        const textTimer = setInterval(() => {
            setLoadingText(texts[textIndex]);
            textIndex = (textIndex + 1) % texts.length;
        }, 400);

        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    clearInterval(textTimer);
                    return 100;
                }
                return prev + Math.random() * 12;
            });
        }, 120);

        return () => {
            clearInterval(progressTimer);
            clearInterval(textTimer);
        };
    }, []);

    return { progress, loadingText };
}