import "../styles/globals.scss";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Navigation } from "@/components/Navigation";
import { MantineProvider } from "@mantine/core";
import { HomePage } from "@/components/HomePage";

export const Home = () => {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Navigation>
          <LanguageToggle />
        </Navigation>
        <HomePage />
      </MantineProvider>
    </>
  );
};

export default Home;
