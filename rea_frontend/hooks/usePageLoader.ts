import { useState, useEffect } from "react";

export const usePageLoader = (delay: number = 1500) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setIsLoading(false);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [delay]);

    return isLoading;
}
