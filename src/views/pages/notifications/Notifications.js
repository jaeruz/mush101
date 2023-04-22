import {
  CAlert,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import firebase from "../../../api/fbConfig";

function Notifications() {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [notifState, setNotifState] = useState([]);
  useEffect(() => {
    const notifications = firebase.database().ref("notifications");

    notifications.on("value", async (snapshot) => {
      console.log("anslklkabslgalshl", snapshot.val());
      if (snapshot.val().length) {
        const tempSorted = snapshot.val().sort((a, b) => b.id - a.id);

        setNotifState(tempSorted);
      }

      // console.log(snapshot.val()[0]);
    });
  }, []);

  // useEffect(() => {
  //   console.log(notifState);
  // }, [notifState]);

  const handleClick = (index) => {
    setModalContent(index);
    setModal(true);
    const notifications = firebase.database().ref("notifications");
    notifications
      .child(notifState.length - index - 1)
      .update({ isChecked: true });
    console.log(index);
    console.log(notifState.length - index - 2);
  };

  return (
    <div>
      <CModal
        show={modal}
        onClose={() => {
          setModal(!modal);
        }}
        centered
      >
        {modalContent !== null && notifState.length ? (
          <>
            <CModalHeader>
              <span style={{ color: "lightgray" }}>
                {notifState[modalContent].date}
              </span>
            </CModalHeader>
            <CModalBody>
              <h4 style={{ textAlign: "center" }}>
                {notifState[modalContent].message}
              </h4>
            </CModalBody>
          </>
        ) : (
          <p>Loading..</p>
        )}
      </CModal>
      <CRow>
        <CCol lg={2}></CCol>
        <CCol lg={8}>
          <CCard style={{ height: "80vh", overflowY: "hidden" }}>
            <CCardHeader>Notifications</CCardHeader>
            <CCardBody>
              {notifState.length
                ? notifState.map((n, index) => {
                    if (n.isChecked) {
                      return (
                        <CAlert
                          color="light"
                          onClick={() => handleClick(index)}
                          style={{ cursor: "pointer" }}
                          key={index}
                        >
                          <CRow>
                            <CCol lg={6}>{n.date}</CCol>
                            <CCol lg={6}>{n.type}</CCol>
                          </CRow>
                        </CAlert>
                      );
                    } else {
                      return (
                        <CAlert
                          color="dark"
                          onClick={() => handleClick(index)}
                          style={{ cursor: "pointer" }}
                          key={index}
                        >
                          <CRow>
                            <CCol lg={6}>{n.date}</CCol>
                            <CCol lg={6}>{n.type}</CCol>
                          </CRow>
                        </CAlert>
                      );
                    }
                  })
                : null}
              {/* <CAlert color="primary">
                This is a updated alert — check it out!
              </CAlert>
              <CAlert color="secondary">
                This is a secondary alert — check it out!
              </CAlert>
              <CAlert color="success">
                This is a success alert — check it out!
              </CAlert>
              <CAlert color="danger">
                This is a danger alert — check it out!
              </CAlert>
              <CAlert color="warning">
                This is a warning alert — check it out!
              </CAlert>
              <CAlert color="info">This is a info alert — check it out!</CAlert>
              <CAlert color="light">
                This is a light alert — check it out!
              </CAlert>
              <CAlert color="dark">This is a dark alert — check it out!</CAlert> */}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg={2}></CCol>
      </CRow>
    </div>
  );
}

export default Notifications;
