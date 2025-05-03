import { lineChartData } from "@/models/homepage";
import { LineChart } from "@mantine/charts";
import { Title } from "@mantine/core";

const HomePage = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-16 text-white my-8">
        <h1 className="text-3xl">Przejdź do Real Estate</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Title order={4} mb="sm" className="text-white">
          Wykresy cen nieruchomości
        </Title>
        <LineChart
          h={400}
          w={800}
          data={lineChartData}
          dataKey="month"
          series={[
            { name: "Average", color: "blue.6" },
            { name: "Median", color: "teal.6" },
          ]}
          curveType="natural"
          tickLine="none"
          gridAxis="none"
          xAxisLabel="Month"
          yAxisLabel="Average"
          withDots={false}
          withTooltip={false}
        />
        <div></div>
      </div>
    </>
  );
};

export default HomePage;
