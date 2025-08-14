import { useLayoutEffect, useEffect, useState } from "react";
import * as echarts from "echarts";
import type { SeriesOption } from "echarts";

export type ChartProps = {
  data: any[];
  height?: number;
  showPrediction?: boolean;
  accentColor?: string;
  secondaryColor?: string;
  showDetailedTooltip?: boolean;
  series?: SeriesOption[];
};

export const useEcharts = (
  ref: React.RefObject<HTMLDivElement | null>,
  {
    data,
    height = 300,
    showPrediction = false,
    accentColor = "#3b82f6",
    secondaryColor = "#818cf8",
    series,
    showDetailedTooltip = false,
  }: ChartProps
) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Track dark mode changes
  useEffect(() => {
    const updateTheme = () => {
      setIsDarkMode(document.documentElement.getAttribute('data-mantine-color-scheme') === 'dark');
    };
    
    updateTheme(); // Initial check
    
    // Listen for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-mantine-color-scheme']
    });
    
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!ref.current) return;

    // Ustawiamy wysokość kontenera
    ref.current.style.height = `${height}px`;

    const chart = echarts.init(ref.current);

    // Dynamic colors based on theme
    const textColor = isDarkMode ? '#ced4da' : '#6b7280';
    const borderColor = isDarkMode ? '#2c2e33' : '#e5e7eb';
    const splitLineColor = isDarkMode ? '#373a40' : '#f3f4f6';
    const tooltipBg = isDarkMode ? 'rgba(26, 27, 30, 0.95)' : 'rgba(255,255,255,0.95)';
    const tooltipBorder = isDarkMode ? '#2c2e33' : '#e5e7eb';
    const tooltipTextColor = isDarkMode ? '#ced4da' : '#374151';
    const itemBorderColor = isDarkMode ? '#1a1b1e' : '#fff';

    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",
      grid: { left: "3%", right: "4%", bottom: "18%", containLabel: true },
      tooltip: showDetailedTooltip
        ? {
          trigger: "axis",
          backgroundColor: tooltipBg,
          borderColor: tooltipBorder,
          borderWidth: 1,
          textStyle: { color: tooltipTextColor },
          axisPointer: { type: "cross", crossStyle: { color: "#999" } },
        }
        : { 
          trigger: "axis",
          backgroundColor: tooltipBg,
          borderColor: tooltipBorder,
          textStyle: { color: tooltipTextColor },
        },
      legend: {
        show: true,
        data: (series && series.length)
          ? series.map((s) => s.name as string)
          : ["Actual Price", ...(showPrediction ? ["Prediction"] : [])],
        top: "5%",
        left: "center",
        textStyle: { color: textColor },
        itemGap: 20,
      },
      dataZoom: [
        { type: "inside", zoomOnMouseWheel: true, throttle: 50 },
        {
          type: "slider",
          bottom: "8%",
          height: 20,
          handleSize: "80%",
          handleStyle: { borderColor: isDarkMode ? "#495057" : "#888" },
          backgroundColor: isDarkMode ? '#25262b' : '#f8f9fa',
          borderColor: borderColor,
          textStyle: { color: textColor },
        },
      ],
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: data.map((item) => item.month),
        axisLine: { lineStyle: { color: borderColor } },
        axisLabel: { color: textColor },
      },
      yAxis: {
        type: "value",
        axisLine: { lineStyle: { color: borderColor } },
        axisLabel: { color: textColor },
        splitLine: { lineStyle: { color: splitLineColor, type: "dashed" } },
      },
      series:
        series && series.length
          ? series
          : [
            {
              name: "Actual Price",
              type: "line" as const,
              data: data.map((item) => item.price),
              smooth: true,
              lineStyle: { color: accentColor, width: 3 },
              itemStyle: {
                color: accentColor,
                borderWidth: 2,
                borderColor: itemBorderColor,
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: `${accentColor}20` },
                  { offset: 1, color: `${accentColor}05` },
                ]),
              },
              emphasis: { focus: "series" as const },
            },
            ...(showPrediction
              ? [
                {
                  name: "Prediction",
                  type: "line" as const,
                  data: data.map((item) => item.prediction),
                  smooth: true,
                  lineStyle: {
                    color: secondaryColor,
                    width: 2,
                    type: "dashed" as const,
                  },
                  itemStyle: {
                    color: secondaryColor,
                    borderWidth: 2,
                    borderColor: itemBorderColor,
                  },
                  emphasis: { focus: "series" as const },
                },
              ]
              : []),
          ],
    };

    chart.setOption(option);
    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [
    ref,
    data,
    height,
    showPrediction,
    accentColor,
    secondaryColor,
    series,
    showDetailedTooltip,
    isDarkMode,
  ]);
};
