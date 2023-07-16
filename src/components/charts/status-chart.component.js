import React, { useEffect, useState } from "react";
import axios from "axios";
import 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";

const labels = ["Open", "In Progress", "Resolved"];
const backgroundColor = ["gold", "cornflowerblue", "darkslategray"];
const options = {
  maintainAspectRatio: false,
  responsive: false,
};

const StatusChart = () => {
  const [data, setData] = useState({
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: backgroundColor,
      },
    ],
    labels: labels,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/tickets/")
      .then((res) => {
        const ticketCounts = res.data.reduce(
          (counts, ticket) => {
            switch (ticket.status) {
              case "Open":
                counts.open++;
                break;
              case "In Progress":
                counts.progress++;
                break;
              case "Resolved":
                counts.resolved++;
                break;
              default:
                break;
            }
            return counts;
          },
          { open: 0, progress: 0, resolved: 0 }
        );
        setData({
          datasets: [
            {
              data: [
                ticketCounts.open,
                ticketCounts.progress,
                ticketCounts.resolved,
              ],
              backgroundColor: backgroundColor,
            },
          ],
          labels: labels,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Doughnut data={data} options={options} height={300} width={500} />
    </div>
  );
};

export default StatusChart;
