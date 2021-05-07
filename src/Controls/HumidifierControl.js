import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
  CButton,
  CInput,
  CListGroupItem,
  CListGroup,
  CSelect,
  CCardFooter,
  CForm,
} from "@coreui/react";
import firebase from "../api/fbConfig";

function HumidifierControl({ humidifierFlag }) {
  const [humidifierON, setHumidifierON] = useState(null);
  const [humidifierSchedON, setHumidifierSchedON] = useState(null);

  const [humidifierCheck, setHumidifierCheck] = useState({
    manual2: null,
    scheduled2: null,
  });
  const options = [1, 2, 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 59];
  const [schedFlag, setschedFlag] = useState(false);
  const [tempSchedule, setTempSchedule] = useState({
    time2: null,
    duration2: 1,
  });
  const [ScheduledItem, setScheduledItem] = useState([]);

  useEffect(() => {
    const humidifier = firebase.database().ref("metaData/Controls/humidifier");
    humidifier.on("value", async (snapshot) => {
      console.log(snapshot.val().manualON);
      setHumidifierON(snapshot.val().manualON);
      setHumidifierSchedON(snapshot.val().scheduledON);
      setScheduledItem(snapshot.val().scheduled.scheduledItems);
      setschedFlag(true);
    });
  }, []);

  useEffect(() => {
    if (humidifierON !== null && humidifierFlag !== null) {
      console.log(humidifierON);
      const humidifierManualON = firebase
        .database()
        .ref("metaData/Controls/humidifier");

      humidifierManualON.update({ manualON: humidifierON });
    }
  }, [humidifierON, humidifierFlag]);

  useEffect(() => {
    if (humidifierSchedON !== null && humidifierFlag !== null) {
      const humidifierSO = firebase
        .database()
        .ref("metaData/Controls/humidifier");

      humidifierSO.update({ scheduledON: humidifierSchedON });
    }
  }, [humidifierSchedON, humidifierFlag]);

  useEffect(() => {
    if (humidifierFlag !== null) {
      if (!humidifierFlag) {
        const humidifierManualON = firebase
          .database()
          .ref("metaData/Controls/humidifier");

        humidifierManualON.update({ manualON: false });
      } else {
        const humidifierSO = firebase
          .database()
          .ref("metaData/Controls/humidifier");

        humidifierSO.update({ scheduledON: false });
      }
      setHumidifierCheck({
        manual2: humidifierFlag,
        scheduled2: !humidifierFlag,
      });
    }
  }, [humidifierFlag]);

  useEffect(() => {
    if (humidifierCheck.manual2 !== null) {
      document.getElementById("manual2").checked = humidifierCheck.manual2;
      document.getElementById("scheduled2").checked =
        humidifierCheck.scheduled2;

      const humidifier = firebase
        .database()
        .ref("metaData/Controls/humidifier");

      humidifier.update({ manual: humidifierCheck.manual2 });
    }
  }, [humidifierCheck]);

  const handleCheck2 = (e) => {
    if (e.target.id == "manual2" && e.target.checked == true) {
      setHumidifierCheck({
        manual2: true,
        scheduled2: false,
      });
    } else if (e.target.id == "scheduled2" && e.target.checked == true) {
      setHumidifierCheck({
        manual2: false,
        scheduled2: true,
      });
    }
  };

  const handleChange = (e) => {
    setTempSchedule({
      ...tempSchedule,
      [e.target.id]: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (tempSchedule.time !== null) {
      setScheduledItem([...ScheduledItem, tempSchedule]);
    }
  };
  const handleDelete = (index) => {
    let clone = [...ScheduledItem];
    console.log(ScheduledItem);
    clone.splice(index, 1);
    console.log(clone);

    setScheduledItem(clone);
  };

  useEffect(() => {
    if (schedFlag) {
      const humidifier = firebase
        .database()
        .ref("metaData/Controls/humidifier/scheduled");

      humidifier.update({ scheduledItems: ScheduledItem });
    }
  }, [ScheduledItem]);
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow style={{ paddingTop: "10px" }}>
            <CCol sm={8}>
              <h5>Humidifier</h5>
            </CCol>
          </CRow>
        </CCardHeader>
        {humidifierFlag !== null ? (
          <CCardBody>
            <CRow>
              <CCol lg={6}>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    id="manual2"
                    name="manual2"
                    value="manual2"
                    onChange={handleCheck2}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="manual2">
                    Manual
                  </CLabel>
                </CFormGroup>
                <br />
                <br />
                {humidifierCheck.manual2 ? (
                  <CButton
                    block
                    color={humidifierON ? "danger" : "primary"}
                    id="hum-on"
                    onClick={() => {
                      setHumidifierON(!humidifierON);
                    }}
                  >
                    {humidifierON ? "Turn OFF" : "Turn ON"}
                  </CButton>
                ) : (
                  <CButton
                    block
                    color={humidifierON ? "danger" : "primary"}
                    id="hum-on"
                    disabled
                    style={{ opacity: 0.4 }}
                  >
                    {humidifierON ? "Turn OFF" : "Turn ON"}
                  </CButton>
                )}

                <br />
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    id="scheduled2"
                    name="scheduled2"
                    onChange={handleCheck2}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="scheduled2">
                    Scheduled
                  </CLabel>
                </CFormGroup>
                <br />
                <br />
                <div
                  style={
                    humidifierCheck.manual2 ? { opacity: 0.5 } : { opacity: 1 }
                  }
                >
                  <CForm onSubmit={handleAdd}>
                    <CFormGroup row>
                      <CCol md="2">
                        <CLabel htmlFor="time2">Time:</CLabel>
                      </CCol>
                      <CCol md="10">
                        {humidifierCheck.manual2 || humidifierSchedON ? (
                          <CInput
                            type="time"
                            name="time2"
                            disabled
                            id="time2"
                          />
                        ) : (
                          <CInput
                            type="time"
                            name="time2"
                            id="time2"
                            onChange={handleChange}
                          />
                        )}
                      </CCol>
                      <br />
                      <br />
                      <CCol md="3">
                        <CLabel htmlFor="duration2">Duration (m) :</CLabel>
                      </CCol>
                      <CCol md="9">
                        {humidifierCheck.manual2 || humidifierSchedON ? (
                          <CSelect custom name="select" id="duration2" disabled>
                            {options.map((i) => {
                              return (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              );
                            })}
                          </CSelect>
                        ) : (
                          <CSelect
                            custom
                            name="select"
                            id="duration2"
                            onChange={handleChange}
                          >
                            {options.map((i) => {
                              return (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              );
                            })}
                          </CSelect>
                        )}
                      </CCol>
                    </CFormGroup>
                    {humidifierCheck.manual2 || humidifierSchedON ? (
                      <CButton block color="primary" disabled type="submit">
                        Add
                      </CButton>
                    ) : (
                      <CButton block color="primary" type="submit">
                        Add
                      </CButton>
                    )}
                  </CForm>
                </div>
              </CCol>
              <CCol lg={6}>
                <CCard
                  style={
                    humidifierCheck.manual2 ? { opacity: 0.5 } : { opacity: 1 }
                  }
                >
                  <CCardHeader>
                    <CRow>
                      <CCol md={5}>
                        <span>Time</span>
                      </CCol>
                      <CCol md={4}>
                        <span>Duration</span>
                      </CCol>
                      <CCol md={3}>
                        <span>Options</span>
                      </CCol>
                    </CRow>
                  </CCardHeader>

                  <div style={{ overflowY: "scroll", height: "25vh" }}>
                    <CListGroup>
                      {ScheduledItem.length
                        ? ScheduledItem.map((si, index) => {
                            return (
                              <CListGroupItem key={index}>
                                {index !== 0 ? (
                                  <CRow>
                                    <CCol md={5}>{si.time2}</CCol>
                                    <CCol md={4}>{si.duration2}</CCol>
                                    <CCol md={3}>
                                      <p
                                        style={{
                                          cursor: "pointer",
                                          color: "red",
                                        }}
                                        onClick={() => handleDelete(index)}
                                      >
                                        delete
                                      </p>
                                    </CCol>
                                  </CRow>
                                ) : null}
                              </CListGroupItem>
                            );
                          })
                        : null}
                    </CListGroup>
                  </div>
                  <CCardFooter>
                    {humidifierCheck.manual2 ? (
                      <CButton
                        block
                        color={humidifierSchedON ? "danger" : "success"}
                        id="sched-on2"
                        disabled
                      >
                        {humidifierSchedON ? "Stop" : "Start"}
                      </CButton>
                    ) : (
                      <CButton
                        block
                        color={humidifierSchedON ? "danger" : "success"}
                        id="sched-on2"
                        onClick={() => setHumidifierSchedON(!humidifierSchedON)}
                      >
                        {humidifierSchedON ? "Stop" : "Start"}
                      </CButton>
                    )}
                  </CCardFooter>
                </CCard>
              </CCol>
            </CRow>
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

export default HumidifierControl;
