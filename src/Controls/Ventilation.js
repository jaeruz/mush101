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

function Ventilation({ ventilationFlag, setVentilationFlag }) {
  const [ventilationON, setVentilationON] = useState(null);
  const [ventilationSchedON, setVentilationSchedON] = useState(null);

  const [ventilationCheck, setVentilationCheck] = useState({
    manual: null,
    scheduled: null,
  });
  const options = [1, 2, 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 59];
  const [schedFlag, setschedFlag] = useState(false);
  const [tempSchedule, setTempSchedule] = useState({
    time: null,
    duration: 1,
  });
  const [ScheduledItem, setScheduledItem] = useState([]);

  useEffect(() => {
    const ventilation = firebase
      .database()
      .ref("metaData/Controls/ventilation");
    ventilation.on("value", async (snapshot) => {
      console.log(snapshot.val().manualON);
      setVentilationON(snapshot.val().manualON);
      setVentilationSchedON(snapshot.val().scheduledON);
      setScheduledItem(snapshot.val().scheduled.scheduledItems);
      setschedFlag(true);
    });
  }, []);

  useEffect(() => {
    if (ventilationON !== null && ventilationFlag !== null) {
      const ventilationManualOn = firebase
        .database()
        .ref("metaData/Controls/ventilation");

      ventilationManualOn.update({ manualON: ventilationON });
    }
  }, [ventilationON, ventilationFlag]);

  useEffect(() => {
    console.log(ventilationSchedON);
    if (ventilationSchedON !== null && ventilationFlag !== null) {
      const ventilationSO = firebase
        .database()
        .ref("metaData/Controls/ventilation");

      ventilationSO.update({ scheduledON: ventilationSchedON });
    }
  }, [ventilationSchedON, ventilationFlag]);

  useEffect(() => {
    if (ventilationFlag !== null) {
      if (!ventilationFlag) {
        const ventilationManualOn = firebase
          .database()
          .ref("metaData/Controls/ventilation");

        ventilationManualOn.update({ manualON: false });
      } else {
        const ventilationSO = firebase
          .database()
          .ref("metaData/Controls/ventilation");

        ventilationSO.update({ scheduledON: false });
      }

      setVentilationCheck({
        manual: ventilationFlag,
        scheduled: !ventilationFlag,
      });
    }
  }, [ventilationFlag]);

  useEffect(() => {
    if (ventilationCheck.manual !== null) {
      document.getElementById("manual").checked = ventilationCheck.manual;
      document.getElementById("scheduled").checked = ventilationCheck.scheduled;

      const ventilation = firebase
        .database()
        .ref("metaData/Controls/ventilation");

      ventilation.update({ manual: ventilationCheck.manual });
    }
  }, [ventilationCheck]);

  const handleCheck = (e) => {
    if (e.target.id == "manual" && e.target.checked == true) {
      setVentilationCheck({
        manual: true,
        scheduled: false,
      });
    } else if (e.target.id == "scheduled" && e.target.checked == true) {
      setVentilationCheck({
        manual: false,
        scheduled: true,
      });
    }
  };

  const handleDelete = (index) => {
    let clone = [...ScheduledItem];
    console.log(ScheduledItem);
    clone.splice(index, 1);
    console.log(clone);

    setScheduledItem(clone);
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
  useEffect(() => {
    if (schedFlag) {
      const ventilation = firebase
        .database()
        .ref("metaData/Controls/ventilation/scheduled");

      ventilation.update({ scheduledItems: ScheduledItem });
    }
  }, [ScheduledItem]);

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow style={{ paddingTop: "10px" }}>
            <CCol sm={8}>
              <h5>Air Flow</h5>
            </CCol>
          </CRow>
        </CCardHeader>
        {ventilationFlag !== null ? (
          <CCardBody>
            <CRow>
              <CCol lg={6}>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    id="manual"
                    name="manual"
                    value="manual"
                    onChange={handleCheck}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="manual">
                    Manual
                  </CLabel>
                </CFormGroup>
                <br />
                <br />
                {ventilationCheck.manual ? (
                  <CButton
                    block
                    color={ventilationON ? "danger" : "primary"}
                    id="vent-on"
                    onClick={() => {
                      setVentilationON(!ventilationON);
                    }}
                  >
                    {ventilationON ? "Turn OFF" : "Turn ON"}
                  </CButton>
                ) : (
                  <CButton
                    block
                    color={ventilationON ? "danger" : "primary"}
                    disabled
                    id="vent-on"
                    style={{ opacity: 0.4 }}
                  >
                    {ventilationON ? "Turn OFF" : "Turn ON"}
                  </CButton>
                )}

                <br />
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    id="scheduled"
                    name="scheduled"
                    onChange={handleCheck}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="scheduled">
                    Scheduled
                  </CLabel>
                </CFormGroup>
                <br />
                <br />
                <div
                  style={
                    ventilationCheck.manual ? { opacity: 0.5 } : { opacity: 1 }
                  }
                >
                  <CForm onSubmit={handleAdd}>
                    <CFormGroup row>
                      <CCol md="2">
                        <CLabel htmlFor="time">Time:</CLabel>
                      </CCol>
                      <CCol md="10">
                        {ventilationCheck.manual || ventilationSchedON ? (
                          <CInput
                            type="time"
                            name="time"
                            id="time"
                            disabled
                            onChange={handleChange}
                          />
                        ) : (
                          <CInput
                            type="time"
                            name="time"
                            id="time"
                            onChange={handleChange}
                          />
                        )}
                      </CCol>
                      <br />
                      <br />
                      <CCol md="3">
                        <CLabel htmlFor="duration">Duration (m) :</CLabel>
                      </CCol>
                      <CCol md="9">
                        {ventilationCheck.manual || ventilationSchedON ? (
                          <CSelect custom id="duration" disabled>
                            {options.map((i) => {
                              return (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              );
                            })}
                          </CSelect>
                        ) : (
                          <CSelect custom id="duration" onChange={handleChange}>
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
                    {ventilationCheck.manual || ventilationSchedON ? (
                      <CButton block color="primary" disabled>
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
                    ventilationCheck.manual ? { opacity: 0.5 } : { opacity: 1 }
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
                                    <CCol md={5}>{si.time}</CCol>
                                    <CCol md={4}>{si.duration}</CCol>
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
                    {ventilationCheck.manual ? (
                      <CButton
                        block
                        color={ventilationSchedON ? "danger" : "success"}
                        disabled
                        id="sched-on"
                      >
                        Start
                      </CButton>
                    ) : (
                      <CButton
                        block
                        color={ventilationSchedON ? "danger" : "success"}
                        onClick={() =>
                          setVentilationSchedON(!ventilationSchedON)
                        }
                        id="sched-on"
                      >
                        {ventilationSchedON ? "Stop" : "Start"}
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

export default Ventilation;
