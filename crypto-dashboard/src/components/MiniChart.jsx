import React from "react";
import { Line } from "react-chartjs-2";

//Necessary pieces from chart.js

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
} from 'chart.js';

//Register pieces

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
  );