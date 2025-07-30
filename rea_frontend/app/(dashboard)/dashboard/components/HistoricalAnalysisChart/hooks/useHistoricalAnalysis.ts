import { useMemo } from "react";
import {
  addMonths,
  subMonths,
  subYears,
  format,
  isWithinInterval,
} from "date-fns";
import { cityBasePrices, HistoricalDataPoint } from "../models";

type Range = "3m" | "6m" | "1y" | "2y" | "3y" | "5y" | "all" | "custom";

export const useHistoricalData = (
  city: string | null,
  range: Range,
  custom: [Date | null, Date | null]
): HistoricalDataPoint[] =>
  useMemo(() => {
    const today = new Date();
    let startDate: Date;

    switch (range) {
      case "3m":
        startDate = subMonths(today, 3);
        break;
      case "6m":
        startDate = subMonths(today, 6);
        break;
      case "1y":
        startDate = subYears(today, 1);
        break;
      case "2y":
        startDate = subYears(today, 2);
        break;
      case "3y":
        startDate = subYears(today, 3);
        break;
      case "5y":
        startDate = subYears(today, 5);
        break;
      case "all":
        startDate = subYears(today, 5);
        break;
      case "custom":
        startDate = custom[0] || subYears(today, 1);
        break;
      default:
        startDate = subYears(today, 1);
    }

    const [begin, end] = custom;
    const base = cityBasePrices[city || "warszawa"] || 10000;
    const monthlyPoints: HistoricalDataPoint[] = [];

    for (
      let current = startDate;
      current <= today;
      current = addMonths(current, 1)
    ) {
      const month = current.getMonth();
      const year = current.getFullYear();
      const yearsDiff =
        today.getFullYear() - year + (today.getMonth() - month) / 12;
      const trend = 1 + (5 - yearsDiff) * 0.02;
      let season = 1;
      if (month >= 4 && month <= 8) {
        season = 1 + Math.sin(((month - 4) / 4) * Math.PI) * 0.05;
      }
      const rand = 1 + (Math.random() - 0.5) * 0.03;
      const price = base * trend * season * rand;

      const point: HistoricalDataPoint = {
        date: format(current, "yyyy-MM-dd"),
        month: format(current, "yyyy-MM"),
        price: +price.toFixed(2),
        forecast: +(price * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2),
        new_listings: Math.floor(50 + Math.random() * 50),
        sales_volume: Math.floor(30 + Math.random() * 40),
        market_inventory: Math.floor(200 + Math.random() * 100),
      };

      if (range === "custom" && begin && end) {
        if (isWithinInterval(current, { start: begin, end })) {
          monthlyPoints.push(point);
        }
      } else {
        monthlyPoints.push(point);
      }
    }

    const extraPoints: HistoricalDataPoint[] = [];
    for (let i = 0; i < 1000; i++) {
      const ts =
        startDate.getTime() +
        Math.random() * (today.getTime() - startDate.getTime());
      const d = new Date(ts);
      const month = d.getMonth();
      const year = d.getFullYear();
      const yearsDiff =
        today.getFullYear() - year + (today.getMonth() - month) / 12;
      const trend = 1 + (5 - yearsDiff) * 0.02;
      let season = 1;
      if (month >= 4 && month <= 8) {
        season = 1 + Math.sin(((month - 4) / 4) * Math.PI) * 0.05;
      }
      const rand = 1 + (Math.random() - 0.5) * 0.03;
      const price = base * trend * season * rand;

      extraPoints.push({
        date: format(d, "yyyy-MM-dd"),
        month: format(d, "yyyy-MM"),
        price: +price.toFixed(2),
        forecast: +(price * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2),
        new_listings: Math.floor(50 + Math.random() * 50),
        sales_volume: Math.floor(30 + Math.random() * 40),
        market_inventory: Math.floor(200 + Math.random() * 100),
      });
    }

    const all = [...monthlyPoints, ...extraPoints].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return all;
  }, [city, range, custom]);
