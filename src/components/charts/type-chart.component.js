import React, { useEffect, useState } from "react";
import axios from "axios";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const backgroundColor = ["aquamarine", "burlywood", "firebrick", "gray"];
const labels = ["Bug/Error", "Feature Request", "Security", "Other"];
const options = {
  maintainAspectRatio: false,
  responsive: false,
};

const TypeChart = () => {
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        data: [0, 0, 0, 0],
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
              switch (ticket.type) {
                case "Bug/Error":
                  counts.bug++;
                  break;
                case "Feature Request":
                  counts.feature++;
                  break;
                case "Security":
                  counts.security++;
                  break;
                case "Other":
                  counts.other++;
                  break;
                default:
                  break;
              }
            }
            return counts;
          },
          { bug: 0, feature: 0, security: 0, other: 0 }
        );

        const updatedData = {
          labels: labels,
          datasets: [
            {
              data: [
                ticketCounts.bug,
                ticketCounts.feature,
                ticketCounts.security,
                ticketCounts.other,
              ],
              backgroundColor: backgroundColor,
            },
          ],
        };
        setData(updatedData);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Doughnut data={data} options={options} height={300} width={500} />
    </div>
  );
};

export default TypeChart;
