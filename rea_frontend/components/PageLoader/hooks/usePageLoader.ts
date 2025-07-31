import { useState, useEffect } from "react";
import { PAGE_LOADER_TEXTS } from "../models";

export const usePageLoader = () => {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState("Inicjalizacja...");

    useEffect(() => {
        let textIndex = 0;
        const textTimer = setInterval(() => {
            setLoadingText(PAGE_LOADER_TEXTS[textIndex]);
            textIndex = (textIndex + 1) % PAGE_LOADER_TEXTS.length;
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