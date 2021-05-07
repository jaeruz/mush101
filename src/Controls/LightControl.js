import React, { useState, useEffect } from "react";
import firebase from "../api/fbConfig";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CSwitch,
  CFormGroup,
  CInput,
} from "@coreui/react";

function LightControl({ lightValue, flag, handleSlide }) {
  const [lightON, setLightON] = useState(null);
  useEffect(() => {
    const lightVal = firebase.database().ref("metaData/Controls/lightValue");

    lightVal.on("value", async (snapshot) => {
      setLightON(snapshot.val().status);
    });
  }, []);

  useEffect(() => {
    console.log(lightON);
    if (lightON !== null) {
      const lightVal = firebase.database().ref("metaData/Controls/lightValue");
      lightVal.update({ status: lightON });
    }
  }, [lightON]);

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow
            style={{
              paddingTop: "10px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingLeft: "1em",
              paddingRight: "1em",
            }}
          >
            <div>
              <h5>Lights</h5>
            </div>
            <div>
              {lightON !== null ? (
                <CSwitch
                  className={"mx-1"}
                  shape={"pill"}
                  color={"bayulet"}
                  defaultChecked={lightON}
                  onChange={() => setLightON(!lightON)}
                />
              ) : null}
            </div>
          </CRow>
        </CCardHeader>
        {flag && lightValue ? (
          <CCardBody>
            {lightON ? (
              <div>
                <CRow>
                  <CCol sm={3}>Red</CCol>
                  <CCol sm={3}>
                    <span style={{ fontSize: "0.7em" }}>
                      {lightValue.redVal}
                    </span>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      {lightON ? (
                        <CInput
                          type="range"
                          className="custom-range"
                          min="0"
                          max="255"
                          defaultValue={lightValue.redVal}
                          id="redVal"
                          onChange={handleSlide}
                        />
                      ) : (
                        <CInput
                          type="range"
                          className="custom-range"
                          min="0"
                          max="255"
                          defaultValue={lightValue.redVal}
                          id="redVal"
                          onChange={handleSlide}
                          disabled
                        />
                      )}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={3}>Green</CCol>
                  <CCol sm={3}>
                    <span style={{ fontSize: "0.7em" }}>
                      {lightValue.greenVal}
                    </span>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      {lightON ? (
                        <CInput
                          type="range"
                          className="custom-range"
                          min="0"
                          max="255"
                          defaultValue={lightValue.greenVal}
                          id="greenVal"
                          onChange={handleSlide}
                        />
                      ) : (
                        <CInput
                          type="range"
                          className="custom-range"
                          min="0"
                          max="255"
                          defaultValue={lightValue.greenVal}
                          id="greenVal"
                          onChange={handleSlide}
                          disabled
                        />
                      )}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={3}>Blue</CCol>
                  <CCol sm={3}>
                    <span style={{ fontSize: "0.7em" }}>
                      {lightValue.blueVal}
                    </span>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      {lightON ? (
                        <CInput
                          type="range"
                          className="custom-range"
                          min="0"
                          max="255"
                          defaultValue={lightValue.blueVal}
                          id="blueVal"
                          onChange={handleSlide}
                        />
                      ) : (
                        <CInput
                          type="range"
                          className="custom-range"
                          min="0"
                          max="255"
                          defaultValue={lightValue.blueVal}
                          id="blueVal"
                          onChange={handleSlide}
                          disabled
                        />
                      )}
                    </CFormGroup>
                  </CCol>
                </CRow>
              </div>
            ) : (
              <div style={{ opacity: "0.5" }}>
                <CRow>
                  <CCol sm={3}>Red</CCol>
                  <CCol sm={3}>
                    <span style={{ fontSize: "0.7em" }}>
                      {lightValue.redVal}
                    </span>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      {lightON ? (
                        <CInput
                          type="range"
                          className="custom-range"
                          min="0"
                          max="255"
                          defaultValue={lightValue.redVal}
                          id="redVal"
                          onChange={handleSlide}
                        />
                      ) : (
                        <CInput
                          type="range"
                          className="custom-range"
                          min="0"
                          max="255"
                          defaultValue={lightValue.redVal}
                          id="redVal"
                          onChange={handleSlide}
                          disabled
                        />
                      )}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={3}>Green</CCol>
                  <CCol sm={3}>
                    <span style={{ fontSize: "0.7em" }}>
                      {lightValue.greenVal}
                    </span>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      {lightON ? (
                        <CInput
                          type="range"
                          className="custom-range"
                          min="0"
                          max="255"
                          defaultValue={lightValue.greenVal}
                          id="greenVal"
                          onChange={handleSlide}
                        />
                      ) : (
                        <CInput
                          type="range"
                          className="custom-range"
                          min="0"
                          max="255"
                          defaultValue={lightValue.greenVal}
                          id="greenVal"
                          onChange={handleSlide}
                          disabled
                        />
                      )}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={3}>Blue</CCol>
                  <CCol sm={3}>
                    <span style={{ fontSize: "0.7em" }}>
                      {lightValue.blueVal}
                    </span>
                  </CCol>
                  <CCol sm={6}>
                    <CFormGroup>
                      {lightON ? (
                        <CInput
                          type="range"
                          className="custom-range"
                          min="0"
                          max="255"
                          defaultValue={lightValue.blueVal}
                          id="blueVal"
                          onChange={handleSlide}
                        />
                      ) : (
                        <CInput
                          type="range"
                          className="custom-range"
                          min="0"
                          max="255"
                          defaultValue={lightValue.blueVal}
                          id="blueVal"
                          onChange={handleSlide}
                          disabled
                        />
                      )}
                    </CFormGroup>
                  </CCol>
                </CRow>
              </div>
            )}
          </CCardBody>
        ) : (
          <div style={{ textAlign: "center", padding: "2em" }}>
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </CCard>
    </>
  );
}

export default LightControl;
