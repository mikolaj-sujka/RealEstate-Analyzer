import { HomeCharts } from "./HomeCharts";

const HomePage = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-16 text-white my-4">
        <h1 className="text-5xl">Przejdź do Real Estate</h1>
      </div>
      <HomeCharts />
    </>
  );
};

export default HomePage;
