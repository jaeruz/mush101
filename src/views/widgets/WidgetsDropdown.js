import React, { useEffect, useState } from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CModal,
  CModalHeader,
  CModalBody,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";
import ChartBarSimple from "../charts/ChartBarSimple";
import firebase from "../../api/fbConfig";
import SensorChart from "../charts/SensorChart";

const WidgetsDropdown = ({ labelsList, sensorValuesList }) => {
  const [modal, setModal] = useState(false);
  const [modalState, setModalState] = useState({
    data: null,
    color: null,
    name: null,
  });
  const [SensorValues, setSensorValues] = useState({
    lux: 0,
    hum: 0,
    temp: 0,
    co2: 0,
  });
  useEffect(() => {
    const Sensors = firebase.database().ref("metaData"); //.child("Sensors");
    Sensors.on("value", async (snapshot) => {
      const sensorParent = snapshot.val().Sensors;

      setSensorValues({
        lux: sensorParent.lux,
        hum: sensorParent.hum,
        temp: sensorParent.temp,
        co2: sensorParent.co2,
      });
    });
  }, []);

  useEffect(() => {
    console.log(SensorValues);
  }, [SensorValues]);

  const showModalSpecified = (index) => {
    switch (index) {
      case 1: {
        setModalState({
          data: SensorValues.temp,
          color: "#4dbd74",
          name: "Temperature",
          query: "temp",
          stepSize: 5,
          max: 40,
        });
        break;
      }
      case 2: {
        setModalState({
          data: SensorValues.hum,
          color: "#20a8d8",
          name: "Humidity",
          query: "hum",
          stepSize: 10,
          max: 100,
        });
        break;
      }
      case 3: {
        setModalState({
          data: SensorValues.co2,
          color: "#f79b0d",
          name: "CO2",
          query: "co2",
          stepSize: 150,
          max: 2000,
        });
        break;
      }
      case 4: {
        setModalState({
          data: SensorValues.lux,
          color: "#f86c6b",
          name: "Light Intensity",
          query: "lux",
          stepSize: 8,
          max: 180,
        });
        break;
      }
    }
    setModal(!modal);
    console.log(index);
  };

  return (
    <>
      <CModal
        show={modal}
        onClose={() => {
          setModal(!modal);
        }}
        centered
        style={{ padding: "0 2em 1em 1em" }}
      >
        <SensorChart
          modalState={modalState}
          sensorValuesList={sensorValuesList}
          labelsList={labelsList}
        />
      </CModal>
      <CRow>
        <CCol sm="6" lg="3">
          <CWidgetDropdown
            onClick={() => showModalSpecified(1)}
            className="widget-sensor-custom"
            color="gradient-success"
            header={SensorValues ? SensorValues.temp + "°C" : 0}
            text="Temperature"
            footerSlot={
              <ChartLineSimple
                pointed
                options={{ elements: { line: { tension: 0.00001 } } }}
                className="c-chart-wrapper mt-3 mx-3"
                style={{ height: "70px", pointerEvents: "none" }}
                dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                pointHoverBackgroundColor="rgba(255,255,255,.7)"
              />
            }
          />
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            onClick={() => showModalSpecified(2)}
            className="widget-sensor-custom"
            color="gradient-info"
            header={SensorValues ? SensorValues.hum + "%" : 0}
            text="Humidity"
            footerSlot={
              <ChartLineSimple
                className="mt-3"
                style={{ height: "70px", pointerEvents: "none" }}
                backgroundColor="rgba(255,255,255,.2)"
                dataPoints={[78, 81, 80, 45, 34, 12, 40]}
                options={{ elements: { line: { borderWidth: 2.5 } } }}
                pointHoverBackgroundColor="warning"
              />
            }
          />
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            onClick={() => showModalSpecified(3)}
            className="widget-sensor-custom"
            color="gradient-warning"
            header={SensorValues ? SensorValues.co2 + " ppm" : 0}
            text="CO2"
            footerSlot={
              <ChartBarSimple
                className="mt-3 mx-3"
                style={{ height: "70px", pointerEvents: "none" }}
                backgroundColor="rgba(255,255,255,.7)"
              />
            }
          />
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            onClick={() => showModalSpecified(4)}
            className="widget-sensor-custom"
            color="gradient-danger"
            header={SensorValues ? SensorValues.lux.toFixed(2) + " lux" : 0}
            text="Light Intensity"
            footerSlot={
              <ChartLineSimple
                pointed
                className="mt-3 mx-3"
                style={{ height: "70px", pointerEvents: "none" }}
                dataPoints={[1, 18, 9, 17, 34, 22, 11]}
                pointHoverBackgroundColor="rgba(255,255,255,.7)"
              />
            }
          >
            {/* <CDropdown>
            <CDropdownToggle caret className="text-white" color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}
          </CWidgetDropdown>
        </CCol>
      </CRow>
    </>
  );
};

export default WidgetsDropdown;
