import React from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);


const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    }
  }
}

const LineChart = ({ value }) => {
  const data = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: '',
        data: value,
        fill: true,
        borderColor: "black",
        backgroundColor: "black",
      },
    ]
  };

  return (
    <Line data={data} options={lineChartOptions} />
  )
}



const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    }
  }
}


const DoughnutChart = ({ value }) => {
  const data = {
    labels: ["Single Chats", "Group Chats"],
    datasets: [
      {
        label: '',
        data: value,
        backgroundColor: ["black", "gray"],
        offset: 20
      },
    ]
  };

  return (
    <Doughnut data={data} options={doughnutChartOptions} />
  )
}

export { LineChart, DoughnutChart }
