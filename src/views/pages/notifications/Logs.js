import {
  CAlert,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import firebase from "../../../api/fbConfig";
import moment from "moment";

function Logs() {
  const [logsSensors, setlogsSensors] = useState([]);
  const [logsLabels, setLogsLabels] = useState([]);

  useEffect(() => {
    const logs = firebase.database().ref("Sensors");

    logs.on("value", async (snapshot) => {
      const logTemp = snapshot.val();
      let logsToState = [];
      let logsDateKey = [];
      Object.keys(logTemp).map((key, index) => {
        logsToState.push(logTemp[key]);
        let d = new Date(0);
        let epochDate = moment(d.setUTCSeconds(parseInt(key))).format("LLL");
        logsDateKey.push(epochDate);
      });
      logsToState = logsToState.slice(
        logsToState.length - 300,
        logsToState.length
      );
      logsDateKey = logsDateKey.slice(
        logsDateKey.length - 300,
        logsDateKey.length
      );
      //   console.log("logsToState", logsToState.reverse());
      //     console.log("logsDateKey", logsDateKey.reverse());
      setlogsSensors(logsToState.reverse());
      setLogsLabels(logsDateKey.reverse());
    });
  }, []);

  return (
    <div>
      <CRow>
        <CCol lg={2}></CCol>
        <CCol lg={8}>
          <CCard style={{ height: "80vh", overflowY: "hidden" }}>
            <CCardHeader>Logs</CCardHeader>
            <CCardBody style={{ overflowY: "scroll" }}>
              <CRow>
                <CCol lg={4}>Date/Time</CCol>
                <CCol lg={2}>Temp</CCol>
                <CCol lg={2}>Rel. Hum</CCol>
                <CCol lg={2}>CO2</CCol>
                <CCol lg={2}>Lux</CCol>
              </CRow>
              <br />

              {logsLabels.length && logsSensors.length
                ? logsSensors.map((ls, index) => {
                    return (
                      <CAlert color="light">
                        <CRow style={{ marginTop: "1em" }}>
                          <CCol lg={4}>{logsLabels[index]}</CCol>
                          <CCol lg={2}>{ls.temp}</CCol>
                          <CCol lg={2}>{ls.hum}</CCol>
                          <CCol lg={2}>{ls.co2}</CCol>
                          <CCol lg={2}>{ls.lux.toFixed(2)}</CCol>
                        </CRow>
                      </CAlert>
                    );
                  })
                : null}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg={2}></CCol>
      </CRow>
    </div>
  );
}

export default Logs;
