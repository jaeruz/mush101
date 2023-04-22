import React, { lazy, useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import { useHistory } from "react-router-dom";

import CIcon from "@coreui/icons-react";
import firebase from "../../api/fbConfig";

import MainChartExample from "../charts/MainChartExample.js";
import BarML from "../charts/BarML";
import moment from "moment";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Dashboard = () => {
  const history = useHistory();
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
        let d = new Date(0);
        let epochDate = moment(d.setUTCSeconds(parseInt(key))).format("LT");
        labels.push(epochDate);
      });

      setLabelsList(labels);
      setSensorValuesList(temp);
    });
  }, []);

  const handleClickCloud = (e) => {
    history.push("/logs");
  };

  useEffect(() => {
    // console.log(sensorValuesList);
  }, [sensorValuesList]);

  useEffect(() => {
    // console.log(labelsList);
  }, [labelsList]);
  return (
    <>
      <WidgetsDropdown
        sensorValuesList={sensorValuesList}
        labelsList={labelsList}
      />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Mushroom Cycle Monitoring
              </h4>
              <div className="small text-muted">{moment().format("LL")}</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton
                color="primary"
                className="float-right"
                onClick={handleClickCloud}
              >
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
          <div className="small text-muted">{moment().format("LL")}</div>
        </CCardHeader>
        <CCardBody>
          <BarML />
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
