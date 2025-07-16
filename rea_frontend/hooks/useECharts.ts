import { useEffect, RefObject, useState, useMemo } from "react";
import * as echarts from "echarts";

export const useECharts = (
  ref: RefObject<HTMLDivElement>,
  getOption: () => echarts.EChartsOption,
  deps: any[] = []
) => {
  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    chart.setOption(getOption());
    const resize = () => chart.resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      chart.dispose();
    };
  }, [ref, getOption]);
};
