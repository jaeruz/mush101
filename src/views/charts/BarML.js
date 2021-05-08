import React from "react";
import { CChartBar } from "@coreui/react-chartjs";
function BarML() {
  return (
    <CChartBar
      style={{ height: "300px", marginTop: "40px" }}
      datasets={[
        {
          label: "percentage",
          backgroundColor: ["#fed766", "#cae1e1", "#2eb85c"],
          data: [40, 20, 12],
        },
      ]}
      labels={["Class A", "Class B", "Class C"]}
      options={{
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: true,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false,
              },
              ticks: {
                fontSize: 15,
                fontColor: "grey",
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                maxTicksLimit: 5,
                stepSize: 10,
                max: 100,
              },
            },
          ],
        },
      }}
    />
  );
}

export default BarML;
