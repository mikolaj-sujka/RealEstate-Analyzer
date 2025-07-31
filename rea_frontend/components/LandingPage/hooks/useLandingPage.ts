import { useDisclosure } from "@mantine/hooks";

export const useLandingPage = () => {
    const [loading, { toggle }] = useDisclosure();

    const handleClick = async () => {
        toggle();
        await new Promise((r) => setTimeout(r, 1500));
        toggle();
    };
    return { loading, handleClick };
}