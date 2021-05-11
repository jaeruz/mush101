import React, { useEffect, useState } from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";

// const brandSuccess = getStyle("success") || "#4dbd74";
// const brandInfo = getStyle("info") || "#20a8d8";
// const brandDanger = getStyle("danger") || "#f86c6b";

const MainChartExample = ({ sensorValuesList, labelsList }) => {
  const [maximums, setMaximums] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
  });
  useEffect(() => {
    // console.log(labelsList);
    if (labelsList && labelsList.length && sensorValuesList.length) {
    }
    // console.log(sensorValuesList);
    let temp = sensorValuesList
      .slice(labelsList.length - 18, labelsList.length)
      .map((i) => i.temp);
    let hum = sensorValuesList
      .slice(labelsList.length - 18, labelsList.length)
      .map((i) => i.hum);
    let co2 = sensorValuesList
      .slice(labelsList.length - 18, labelsList.length)
      .map((i) => i.co2);
    let lux = sensorValuesList
      .slice(labelsList.length - 18, labelsList.length)
      .map((i) => i.lux);

    let maxTemp = temp[0];
    let maxHum = hum[0];
    let maxCo2 = co2[0];
    let maxLux = lux[0];
    for (let i = 1; i !== 18; i++) {
      if (temp[i] >= maxTemp) {
        maxTemp = temp[i];
      }

      if (hum[i] >= maxHum) {
        maxHum = hum[i];
      }

      if (co2[i] >= maxCo2) {
        maxCo2 = co2[i];
      }

      if (lux[i] >= maxLux) {
        maxLux = lux[i];
      }
    }

    setMaximums({
      a: maxTemp,
      b: maxHum,
      c: maxCo2,
      d: maxLux,
    });
  }, [labelsList, sensorValuesList]);
  const defaultDatasets = (() => {
    const data1 = sensorValuesList.length
      ? sensorValuesList
          .slice(labelsList.length - 18, labelsList.length)
          .map((i) => i.temp)
      : [];
    const data2 = sensorValuesList.length
      ? sensorValuesList
          .slice(labelsList.length - 18, labelsList.length)
          .map((i) => i.hum)
      : [];
    const data3 = sensorValuesList.length
      ? sensorValuesList
          .slice(labelsList.length - 18, labelsList.length)
          .map((i) => i.co2)
      : [];
    const data4 = sensorValuesList.length
      ? sensorValuesList
          .slice(labelsList.length - 18, labelsList.length)
          .map((i) => i.lux)
      : [];

    return [
      {
        label: "Temperature",
        yAxisID: "A",
        backgroundColor: "transparent",
        borderColor: "#4dbd74",
        pointHoverBackgroundColor: "#4dbd74",
        borderWidth: 1,
        borderDash: [8, 10],
        data: data1,
      },
      {
        label: "Humidity",
        yAxisID: "B",
        backgroundColor: "transparent",
        borderColor: "#20a8d8",
        pointHoverBackgroundColor: "#20a8d8",
        borderWidth: 1,
        borderDash: [8, 10],
        data: data2,
      },
      {
        label: "CO2",
        yAxisID: "C",
        backgroundColor: "transparent",
        borderColor: "#f79b0d",
        pointHoverBackgroundColor: "#f79b0d",
        borderWidth: 1,

        data: data3,
      },
      {
        label: "Light Intensity",
        yAxisID: "D",
        backgroundColor: "transparent",
        borderColor: "#f86c6b",
        pointHoverBackgroundColor: "#f86c6b",
        borderWidth: 1,
        data: data4,
      },
    ];
  })();

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
            ticks: { fontSize: 5 },
          },
        ],
        yAxes: [
          {
            id: "A",
            type: "linear",
            position: "right",
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil((maximums.a + 20) / 5),
              max: maximums.a + 20,
              fontColor: "#4dbd74",
            },
            gridLines: {
              display: true,
            },
          },
          {
            id: "B",
            position: "left",
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil((maximums.b + 30) / 5),
              max: maximums.b + 30,
              fontColor: "#20a8d8",
            },
            gridLines: {
              display: true,
            },
          },
          {
            id: "C",
            position: "right",
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil((maximums.c + 250) / 5),
              max: maximums.c + 250,
              fontColor: "#f79b0d",
            },
            gridLines: {
              display: true,
            },
          },
          {
            id: "D",
            position: "left",
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil((maximums.d + 100) / 5),
              max: maximums.d + 100,
              fontColor: "#f86c6b",
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };
  })();

  // render
  return (
    <CChartLine
      style={{ height: "300px", marginTop: "40px" }}
      // {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={
        labelsList && labelsList.length
          ? labelsList.slice(labelsList.length - 18, labelsList.length)
          : []
      }
    />
  );
};

export default MainChartExample;
