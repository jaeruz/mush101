import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CProgress,
  CRow,
} from "@coreui/react";
import React, { useState } from "react";

function Notifications() {
  const [visible, setVisible] = useState(10);
  return (
    <div>
      <CRow>
        <CCol lg={2}></CCol>
        <CCol lg={8}>
          <CCard>
            <CCardHeader>Notifications</CCardHeader>
            <CCardBody>
              <CAlert color="primary">
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
              <CAlert color="dark">This is a dark alert — check it out!</CAlert>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg={2}></CCol>
      </CRow>
    </div>
  );
}

export default Notifications;
