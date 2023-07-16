import React, { useEffect, useState } from "react";
import axios from "axios";
import 'chart.js/auto';
import { Bar } from "react-chartjs-2";

const labels = ["Low", "Medium", "High"];
const barPercentage = "0.5";
const backgroundColor = ["lightgreen", "moccasin", "crimson"];
const options = {
  legend: { display: false },
  maintainAspectRatio: false,
  responsive: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const PriorityChart = () => {
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        data: [0, 0, 0],
        barPercentage: barPercentage,
        backgroundColor: backgroundColor,
      },
    ],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/tickets/")
      .then((res) => {
        const ticketCounts = res.data.reduce(
          (counts, ticket) => {
            if (ticket.status !== "Resolved") {
              switch (ticket.priority) {
                case "Low":
                  counts.low++;
                  break;
                case "Medium":
                  counts.medium++;
                  break;
                case "High":
                  counts.high++;
                  break;
                default:
                  break;
              }
            }
            return counts;
          },
          { low: 0, medium: 0, high: 0 }
        );

        setData({
          labels: labels,
          datasets: [
            {
              data: [ticketCounts.low, ticketCounts.medium, ticketCounts.high],
              barPercentage: barPercentage,
              backgroundColor: backgroundColor,
            },
          ],
        });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Bar data={data} options={options} height={350} width={500} />
    </div>
  );
};

export default PriorityChart;
