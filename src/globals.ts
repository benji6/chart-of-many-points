import Regl from "regl";
import { LineChartParams } from "./layouts/lineChart";

export const regl = Regl();

interface State {
  isDemoMode: boolean;
  chartParams0: LineChartParams;
  chartParams1: LineChartParams;
}

export const state: State = {
  isDemoMode: true,
  chartParams0: { domain: [-10, 10], f: (x) => x ** 2, range: [0, 100] },
  chartParams1: {
    domain: [-5, 5],
    f: (x) => Math.sin(x * 12) * x ** 2 + 1 / x + x ** 3,
    range: [-100, 100],
  },
};
