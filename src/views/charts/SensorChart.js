import React, { useEffect } from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { CModalBody, CModalHeader } from "@coreui/react";

function SensorChart({ modalState, sensorValuesList, labelsList }) {
  const data1 = sensorValuesList.length
    ? sensorValuesList
        .slice(labelsList.length - 6, labelsList.length)
        .map((i) => i[modalState.query])
    : [];

  useEffect(() => {
    console.log(modalState);
    console.log(sensorValuesList);
  }, [modalState]);
  if (modalState && modalState.name !== null) {
    return (
      <>
        <CModalHeader>{modalState.name}</CModalHeader>
        <CModalBody>
          <CChartLine
            style={{ height: "300px", marginTop: "40px" }}
            datasets={[
              {
                label: modalState.name,
                backgroundColor: "transparent",
                borderColor: modalState.color,
                pointHoverBackgroundColor: modalState.color,
                borderWidth: 2,
                data: data1,
              },
            ]}
            labels={
              labelsList && labelsList.length
                ? labelsList.slice(labelsList.length - 6, labelsList.length)
                : []
            }
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
                      fontSize: 10,
                      fontColor: "grey",
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      maxTicksLimit: 5,
                      stepSize: modalState.stepSize,
                      max: modalState.max,
                    },
                  },
                ],
              },
            }}
          />
        </CModalBody>
      </>
    );
  } else {
    return <p>Loading..</p>;
  }
}

export default SensorChart;
