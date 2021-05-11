import React, { lazy, useEffect, useState } from "react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import firebase from "../../api/fbConfig";

import MainChartExample from "../charts/MainChartExample.js";
import BarML from "../charts/BarML";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Dashboard = () => {
  const [sensorValuesList, setSensorValuesList] = useState([]);
  const [labelsList, setLabelsList] = useState([]);
  useEffect(() => {
    const sensorValues = firebase.database().ref("Sensors"); //.child("Sensors");
    sensorValues.on("value", async (snapshot) => {
      const ser = snapshot.val();
      const temp = [];
      const labels = [];
      Object.keys(ser).map((key, index) => {
        temp.push(ser[key]);
        labels.push(key);
      });
      setLabelsList(labels);
      setSensorValuesList(temp);
    });
  }, []);

  useEffect(() => {
    // console.log(sensorValuesList);
  }, [sensorValuesList]);

  useEffect(() => {
    // console.log(labelsList);
  }, [labelsList]);
  return (
    <>
      <WidgetsDropdown />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Mushroom Cycle Monitoring
              </h4>
              <div className="small text-muted">November 2017</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download" />
              </CButton>
            </CCol>
          </CRow>
          <MainChartExample
            sensorValuesList={sensorValuesList}
            labelsList={labelsList}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          <h4 id="traffic" className="card-title mb-0">
            Prediction Status
          </h4>
          <div className="small text-muted">November 2017</div>
        </CCardHeader>
        <CCardBody>
          <BarML />
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
