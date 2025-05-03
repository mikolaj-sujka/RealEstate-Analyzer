import { lineChartData, transactionsData, rdiTrend } from "@/models/homepage";
import { LineChart, BarChart, Sparkline } from "@mantine/charts";
import { Title, Text } from "@mantine/core";

const HomeCharts = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="chart-card mb-4">
          <Title
            fw={700}
            order={6}
            mb="sm"
            className="text-white text-left pb-4"
          >
            Wykresy cen nieruchomości
          </Title>
          <LineChart
            h={200}
            w={800}
            data={lineChartData}
            dataKey="month"
            series={[
              { name: "Average", label: "Average Price", color: "blue" },
              { name: "Median", label: "Median Price", color: "teal" },
            ]}
            curveType="natural"
            gridAxis="none"
            xAxisLabel="Month"
            yAxisLabel="Average"
            xAxisProps={{
              interval: 0,
              axisLine: { stroke: "#555" },
              tickLine: { stroke: "#555" },
              tick: { fill: "#aaa" },
            }}
            yAxisProps={{
              ticks: [0, 10, 20, 30, 40, 50, 60],
              axisLine: { stroke: "#555" },
              tickLine: { stroke: "#555" },
              tick: { fill: "#aaa" },
            }}
            legendProps={{ verticalAlign: "bottom", height: 50 }}
            withDots={false}
            withTooltip={false}
            lineProps={{
              isAnimationActive: true,
              animationBegin: 0,
              animationDuration: 2000,
              animationEasing: "ease-out",
            }}
          />
        </div>
        <div className="flex flex-row justify-center w-full gap-4">
          <div className="chart-card">
            <Title
              fw={700}
              order={6}
              mb="sm"
              className="text-white text-left pb-4"
            >
              Liczba zawartych transakcji
            </Title>
            <BarChart
              h={110}
              w={550}
              gridAxis="none"
              data={transactionsData}
              dataKey="month"
              series={[{ name: "Transactions", color: "blue.6" }]}
              tickLine="y"
              withTooltip={false}
              xAxisProps={{
                interval: 0,
                axisLine: { stroke: "#555" },
                tickLine: { stroke: "#555" },
                tick: { fill: "#aaa" },
              }}
              yAxisProps={{
                ticks: [0, 5, 10, 15, 20, 25, 30],
                axisLine: { stroke: "#555" },
                tickLine: { stroke: "#555" },
                tick: { fill: "#aaa" },
              }}
              barProps={{
                barSize: 25,
                isAnimationActive: true,
                animationBegin: 0,
                animationDuration: 2000,
                animationEasing: "ease-out",
              }}
            />
          </div>
          <div className="chart-card">
            <Title order={6} mb="xs" fw={700} className="text-white">
              RDI (5 lat)
            </Title>
            <Text className="text-5xl text-white text-center">15,8%</Text>
            <Sparkline
              w={200}
              h={110}
              data={rdiTrend}
              trendColors={{ positive: "teal.6", negative: "red.6" }}
              fillOpacity={0.1}
              curveType="natural"
              areaProps={{
                isAnimationActive: true,
                animationBegin: 0,
                animationDuration: 2000,
                animationEasing: "ease-out",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCharts;
