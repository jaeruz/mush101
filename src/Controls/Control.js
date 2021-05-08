import React, { useState, useEffect } from "react";
import firebase from "../api/fbConfig";
import {
  CRow,
  CCol,
  CFormGroup,
  CInputRadio,
  CLabel,
  CForm,
} from "@coreui/react";
import LightControl from "./LightControl";
import Ventilation from "./Ventilation";
import HumidifierControl from "./HumidifierControl";
import ML from "./ML";
function Control() {
  const [flag, setFlag] = useState(false);
  const [ventilationFlag, setVentilationFlag] = useState(null);
  const [humidifierFlag, setHumidifierFlag] = useState(null);
  const [automatedConfig, setAutomatedConfig] = useState(null);

  const [lightValue, setlightValue] = useState({
    redVal: 0,
    greenVal: 0,
    blueVal: 0,
  });

  const handleRadio = (e) => {
    if (e.target.id === "automated" && e.target.value === "automated") {
      setAutomatedConfig(true);
    } else if (
      e.target.id === "experimental" &&
      e.target.value === "experimental"
    ) {
      setAutomatedConfig(false);
    } else {
      alert("ERROR!");
    }
  };

  const handleSlide = (e) => {
    console.log("slidey");
    setlightValue({
      ...lightValue,
      [e.target.id]: parseInt(e.target.value),
    });
    console.log(lightValue);
  };

  useEffect(() => {
    console.log(automatedConfig);
    if (automatedConfig !== null) {
      const controls = firebase.database().ref("metaData/Controls");
      controls.update({ automated: automatedConfig });
    }
  }, [automatedConfig]);

  useEffect(() => {
    if (flag) {
      const lightVal = firebase.database().ref("metaData/Controls/lightValue");
      lightVal.update(lightValue);
    }
  }, [lightValue]);

  useEffect(() => {
    const controls = firebase.database().ref("metaData/Controls");
    const lightVal = firebase.database().ref("metaData/Controls/lightValue");
    const ventilation = firebase
      .database()
      .ref("metaData/Controls/ventilation");
    const humidifier = firebase.database().ref("metaData/Controls/humidifier");

    controls.on("value", async (snapshot) => {
      setAutomatedConfig(snapshot.val().automated);
    });

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
              id="automated"
              name="radioG"
              value="automated"
              onChange={handleRadio}
              checked={automatedConfig !== null ? automatedConfig : false}
            />
            <CLabel variant="checkbox" htmlFor="automated">
              <h4>Automated</h4>
            </CLabel>
          </CFormGroup>
          <div
            style={
              automatedConfig
                ? { opacity: 1 }
                : { opacity: 0.5, pointerEvents: "none" }
            }
          >
            <ML />
          </div>
        </CCol>
        <CCol lg={1}></CCol>
      </CRow>

      <CRow>
        <CCol lg={1}></CCol>
        <CCol lg={10}>
          <CFormGroup variant="checkbox">
            <CInputRadio
              className="form-check-input"
              id="experimental"
              name="radioG"
              value="experimental"
              onChange={handleRadio}
              checked={automatedConfig !== null ? !automatedConfig : false}
            />
            <CLabel variant="checkbox" htmlFor="experimental">
              <h4>Experimental</h4>
            </CLabel>
          </CFormGroup>
          <div
            style={
              automatedConfig
                ? { opacity: 0.5, pointerEvents: "none" }
                : { opacity: 1 }
            }
          >
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
          </div>
        </CCol>
        <CCol lg={1}></CCol>
      </CRow>
    </>
  );
}

export default Control;
