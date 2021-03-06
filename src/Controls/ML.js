import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CRow,
  CSelect,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CInput,
  CCardFooter,
} from "@coreui/react";
import firebase from "../api/fbConfig";
import React, { useState, useEffect } from "react";

function ML() {
  const [toggleCycle, setToggleCycle] = useState(null);
  const [modal, setModal] = useState(false);
  const [stopWord, setStopWord] = useState(null);
  const [chosenWord, setChosenWord] = useState(null);
  const words = [
    "jet pogi",
    "Agaricus bitorquis",
    "Agrocybe molesta",
    "Cortinarius traganus",
    "Dermoloma pseudocuneifolium",
    "Hebeloma sinapizans",
    "Pleurotus ostreatus",
    "Mycena picta",
    "nes malakas",
    "mia idi waw",
    "marvin graMarian",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleStartCycle = () => {
    setToggleCycle(!toggleCycle);
  };

  const handleStopCycleLegit = () => {
    setToggleCycle(false);
    setModal(false);
    setStopWord(null);
    document.getElementById("stop-word-input").value = "";
    setChosenWord(words[Math.floor(Math.random() * 11)]);
  };

  const handleChangeStopWord = (e) => {
    setStopWord(e.target.value);
  };
  const handleStopCycle = (e) => {
    setModal(true);
  };
  useEffect(() => {
    console.log(stopWord);
    if (stopWord === chosenWord) {
      console.log("equals!");
      document.getElementById("stop-button-legit").disabled = false;
    }
  }, [stopWord]);

  useEffect(() => {
    if (toggleCycle != null) {
      if (toggleCycle) {
        const controlAutomated = firebase.database().ref("metaData/Controls");
        controlAutomated.update({ automatedON: true });
      } else {
        const controlAutomated = firebase.database().ref("metaData/Controls");
        controlAutomated.update({ automatedON: false });
      }
    }
  }, [toggleCycle]);

  useEffect(() => {
    document.getElementById("stop-button-legit").disabled = true;
    setChosenWord(words[Math.floor(Math.random() * 11)]);

    const automatedON = firebase
      .database()
      .ref("metaData/Controls/automatedON");
    automatedON.on("value", async (snapshot) => {
      console.log(snapshot.val());
      setToggleCycle(snapshot.val());
    });
  }, []);
  return (
    <div>
      <CModal
        show={modal}
        onClose={() => {
          setModal(!modal);
          setStopWord(null);
          document.getElementById("stop-word-input").value = "";
        }}
        centered
      >
        <CModalHeader closeButton>
          Are you sure you want Stop Cycle?
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <CFormGroup>
              <div className="no-copy">
                <h4>
                  Type "<span style={{ color: "#e23f3f" }}>{chosenWord}</span>"
                  to Stop Cycle.
                </h4>
              </div>

              <CInput
                type="text"
                id="stop-word-input"
                onChange={handleChangeStopWord}
              />
            </CFormGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <p style={{ fontSize: "0.8em", color: "grey" }}>
            Warning: This Action cannot be undone!
          </p>

          <CButton
            color="danger"
            id="stop-button-legit"
            onClick={handleStopCycleLegit}
          >
            Stop
          </CButton>
          <CButton color="secondary" onClick={() => setModal(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
      <CCard>
        <CCardBody>
          <CForm>
            <CRow>
              <CCol lg={6}>
                <CFormGroup>
                  <span>Target Quality</span>
                  {toggleCycle ? (
                    <CSelect custom id="duration" disabled>
                      <option value="1">Class A: Small cap, Long stipe</option>
                      <option value="2">
                        Class B: Thin brittle cap, Thick stipe
                      </option>
                      <option value="3">
                        Class C: Strong cap, Strong stipe
                      </option>
                    </CSelect>
                  ) : (
                    <CSelect custom id="duration">
                      <option value="1">Class A: Small cap, Long stipe</option>
                      <option value="2">
                        Class B: Thin brittle cap, Thick stipe
                      </option>
                      <option value="3">
                        Class C: Strong cap, Strong stipe
                      </option>
                    </CSelect>
                  )}
                </CFormGroup>
              </CCol>
              <CCol lg={6}>
                <br />
                <CFormGroup>
                  <CButton
                    block
                    color={toggleCycle ? "danger" : "success"}
                    onClick={!toggleCycle ? handleStartCycle : handleStopCycle}
                  >
                    {toggleCycle ? "Stop Cycle" : "Start Cycle"}
                  </CButton>
                </CFormGroup>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <p style={{ fontSize: "0.8em", color: "grey", textAlign: "center" }}>
            This feature will use Artificial Intelligence (ML) to automatically
            adjust the environment of the tub to achieve the desired fruiting
            quality.
          </p>
        </CCardFooter>
      </CCard>
    </div>
  );
}

export default ML;
