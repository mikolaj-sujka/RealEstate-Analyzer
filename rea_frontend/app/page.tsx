import "../styles/globals.scss";
import { Navigation } from "@/components/Navigation";
import { MantineProvider } from "@mantine/core";
import { HomePage } from "@/components/HomePage";

export const Home = () => {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Navigation />
        <HomePage />
      </MantineProvider>
    </>
  );
};

export default Home;
