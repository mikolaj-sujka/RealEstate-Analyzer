import { lineChartData, transactionsData, rdiTrend } from "@/models/homepage";
import { LineChart, BarChart, Sparkline } from "@mantine/charts";
import { Text } from "@mantine/core";
import { ChartCard, ChartsRow, ChartsWrapper } from "./HomeCharts.styled";

const HomeCharts: React.FC = () => {
  return (
    <ChartsWrapper>
      <ChartCard>
        <Text color="white" size="xl" fw={700} mb="xs" align="center">
          Wykresy cen nieruchomości
        </Text>
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
      </ChartCard>

      <ChartsRow>
        <ChartCard>
          <Text color="white" size="xl" fw={700} mb="xs" align="left">
            Liczba zawartych transakcji
          </Text>
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
        </ChartCard>

        <ChartCard>
          <Text color="white" size="xl" fw={700} mb="xs" align="left">
            RDI (5 lat)
          </Text>
          <Text size="xl" fw={700} color="white" align="center">
            15,8%
          </Text>
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
        </ChartCard>
      </ChartsRow>
    </ChartsWrapper>
  );
};

export default HomeCharts;
