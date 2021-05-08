import React, { useEffect, useState } from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";
import ChartBarSimple from "../charts/ChartBarSimple";
import firebase from "../../api/fbConfig";

const WidgetsDropdown = () => {
  const [modal, setModal] = useState(false);
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

  return (
    <>
      <CModal
        show={modal}
        onClose={() => {
          setModal(!modal);
        }}
        centered
      >
        <CModalBody>*Chart here*</CModalBody>
      </CModal>
      <CRow>
        <CCol sm="6" lg="3">
          <CWidgetDropdown
            onClick={() => setModal(!modal)}
            className="widget-sensor-custom"
            color="gradient-success"
            header={SensorValues ? SensorValues.temp + "°C" : 0}
            text="Temperature"
            footerSlot={
              <ChartLineSimple
                pointed
                options={{ elements: { line: { tension: 0.00001 } } }}
                className="c-chart-wrapper mt-3 mx-3"
                style={{ height: "70px" }}
                dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                pointHoverBackgroundColor="rgba(255,255,255,.7)"
                label="Members"
                labels="months"
              />
            }
          />
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            className="widget-sensor-custom"
            color="gradient-info"
            header={SensorValues ? SensorValues.hum + "%" : 0}
            text="Humidity"
            footerSlot={
              <ChartLineSimple
                className="mt-3"
                style={{ height: "70px" }}
                backgroundColor="rgba(255,255,255,.2)"
                dataPoints={[78, 81, 80, 45, 34, 12, 40]}
                options={{ elements: { line: { borderWidth: 2.5 } } }}
                pointHoverBackgroundColor="warning"
                label="Members"
                labels="months"
              />
            }
          />
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            className="widget-sensor-custom"
            color="gradient-warning"
            header={SensorValues ? SensorValues.co2 + " ppm" : 0}
            text="CO2"
            footerSlot={
              <ChartBarSimple
                className="mt-3 mx-3"
                style={{ height: "70px" }}
                backgroundColor="rgba(255,255,255,.7)"
                label="Members"
                labels="months"
              />
            }
          />
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            className="widget-sensor-custom"
            color="gradient-danger"
            header={SensorValues ? SensorValues.lux.toFixed(2) + " lux" : 0}
            text="Light Intensity"
            footerSlot={
              <ChartLineSimple
                pointed
                className="mt-3 mx-3"
                style={{ height: "70px" }}
                dataPoints={[1, 18, 9, 17, 34, 22, 11]}
                pointHoverBackgroundColor="rgba(255,255,255,.7)"
                label="Members"
                labels="months"
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
