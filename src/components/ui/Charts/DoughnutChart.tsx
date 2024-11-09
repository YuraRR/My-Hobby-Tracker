// src/components/MyDoughnutChart.tsx

import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const DoughnutChart = ({ rating }: { rating: number }) => {
  const ratingRemainder = 100 - rating;
  const data = {
    datasets: [
      {
        label: "Rating",
        data: [rating, ratingRemainder],
        backgroundColor: ["#21d07a", "#204529"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "80%",
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },

      datalabels: {
        anchor: "center",
        align: "center",
        color: "white",
        formatter: () => rating,
      },
    },
  };

  return (
    <div className="size-16 relative">
      <Doughnut data={data} options={options} />
      <span className="text-xl text-white absolute-center">
        {rating.toFixed()}
        <span className="text-[10px] align-top ">%</span>
      </span>
    </div>
  );
};

export default DoughnutChart;
