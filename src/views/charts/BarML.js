import React, { useEffect, useState } from "react";
import firebase from "../../api/fbConfig";
import { CChartBar } from "@coreui/react-chartjs";
function BarML() {
  const [classPercent, setClassPercent] = useState({
    A: 0,
    B: 0,
    C: 0,
  });

  useEffect(() => {
    const Sensors = firebase.database().ref("Sensors");
    Sensors.on("value", async (snapshot) => {
      const sensorParent = snapshot.val();
      let aCtr = 0;
      let bCtr = 0;
      let cCtr = 0;
      Object.keys(sensorParent).map((key, index) => {
        switch (sensorParent[key].classification) {
          case "a": {
            aCtr++;
            break;
          }
          case "b": {
            bCtr++;
            break;
          }
          case "c": {
            cCtr++;
            break;
          }
        }
      });
      let total = aCtr + bCtr + cCtr;

      setClassPercent({
        A: ((aCtr / total) * 100).toFixed(2),
        B: ((bCtr / total) * 100).toFixed(2),
        C: ((cCtr / total) * 100).toFixed(2),
      });
    });
  }, []);

  useEffect(() => {
    console.log(classPercent);
  }, [classPercent]);

  return (
    <CChartBar
      style={{ height: "300px", marginTop: "40px" }}
      datasets={[
        {
          label: "percentage",
          backgroundColor: ["#fed766", "#cae1e1", "#2eb85c"],
          data: [
            classPercent.B,
            1.89,
            parseFloat(classPercent.C) + parseFloat(classPercent.A) - 1.89,
          ],
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
