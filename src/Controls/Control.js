import React, { useState, useEffect } from "react";
import firebase from "../api/fbConfig";
import { CRow, CCol, CFormGroup, CInputRadio, CLabel } from "@coreui/react";
import LightControl from "./LightControl";
import Ventilation from "./Ventilation";
import HumidifierControl from "./HumidifierControl";
import ML from "./ML";
function Control() {
  const [flag, setFlag] = useState(false);
  const [ventilationFlag, setVentilationFlag] = useState(null);
  const [humidifierFlag, setHumidifierFlag] = useState(null);
  const [lightValue, setlightValue] = useState({
    redVal: 0,
    greenVal: 0,
    blueVal: 0,
  });

  const handleSlide = (e) => {
    console.log("slidey");
    setlightValue({
      ...lightValue,
      [e.target.id]: parseInt(e.target.value),
    });
    console.log(lightValue);
  };

  useEffect(() => {
    if (flag) {
      const lightVal = firebase.database().ref("metaData/Controls/lightValue");
      lightVal.update(lightValue);
    }
  }, [lightValue]);

  useEffect(() => {
    const lightVal = firebase.database().ref("metaData/Controls/lightValue");
    const ventilation = firebase
      .database()
      .ref("metaData/Controls/ventilation");
    const humidifier = firebase.database().ref("metaData/Controls/humidifier");

    ventilation.on("value", async (snapshot) => {
      setVentilationFlag(snapshot.val().manual);
    });

    humidifier.on("value", async (snapshot) => {
      setHumidifierFlag(snapshot.val().manual);
    });

    lightVal.on("value", async (snapshot) => {
      console.log(snapshot.val());

      setlightValue({
        redVal: snapshot.val().redVal,
        greenVal: snapshot.val().greenVal,
        blueVal: snapshot.val().blueVal,
      });
      setFlag(true);
    });
  }, []);

  return (
    <>
      <CRow>
        <CCol lg={1}></CCol>
        <CCol lg={10}>
          <CFormGroup variant="checkbox">
            <CInputRadio
              className="form-check-input"
              id="radio1"
              name="radios"
              value="option1"
            />
            <CLabel variant="checkbox" htmlFor="radio1">
              <h4>Automated</h4>
            </CLabel>
          </CFormGroup>

          <ML />
        </CCol>
        <CCol lg={1}></CCol>
      </CRow>

      <CRow>
        <CCol lg={1}></CCol>
        <CCol lg={10}>
          <CFormGroup variant="checkbox">
            <CInputRadio
              className="form-check-input"
              id="radio1"
              name="radios"
              value="option1"
            />
            <CLabel variant="checkbox" htmlFor="radio1">
              <h4>Experimental</h4>
            </CLabel>
          </CFormGroup>

          <Ventilation
            ventilationFlag={ventilationFlag}
            setVentilationFlag={setVentilationFlag}
          />

          <HumidifierControl
            humidifierFlag={humidifierFlag}
            setHumidifierFlag={setHumidifierFlag}
          />

          <LightControl
            flag={flag}
            lightValue={lightValue}
            handleSlide={handleSlide}
          />
        </CCol>
        <CCol lg={1}></CCol>
      </CRow>
    </>
  );
}

export default Control;
