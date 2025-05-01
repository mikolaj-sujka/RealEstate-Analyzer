import '../styles/globals.scss';
import { LanguageToggle } from "@/components/LanguageToggle";
import { Navigation } from "@/components/Navigation";
import { MantineProvider } from "@mantine/core";

export const Home = () => {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Navigation>
          <LanguageToggle />
        </Navigation>
      </MantineProvider>
    </>
  );
};

export default Home;
