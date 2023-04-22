import { CCol, CRow } from "@coreui/react";
import React from "react";
import jet from "../../../assets/icons/jet.jpg";
import mia from "../../../assets/icons/mia.jpg";
import ness from "../../../assets/icons/ness.jpg";
import bin from "../../../assets/icons/bin.jpg";

function Members() {
  return (
    <div>
      <CRow>
        <CCol lg={5}></CCol>
        <CCol lg={6} md={12}>
          <h1>Members</h1>
        </CCol>
        <CCol lg={1}></CCol>
      </CRow>
      <br></br>
      <br></br>

      <CRow>
        <CCol lg={4} md={12}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <img src={jet} width="80%" />
          </div>
        </CCol>
        <CCol lg={8} md={12}>
          <br></br>
          <h4>
            Name:<strong> Jaeruz Datiles</strong>
          </h4>
          <br></br>
          <h4>
            Position:<strong> Developer</strong>
          </h4>
          <br></br>
          <h4>
            He works on the programming, software and hardware development, and
            application creation that are required to render the prototype fully
            functional.{" "}
          </h4>
          <br></br>
        </CCol>
      </CRow>
      <br></br>
      <br />

      <CRow>
        <CCol lg={4} md={12}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <img src={mia} width="80%" />
          </div>
        </CCol>

        <CCol lg={8} md={12}>
          <br></br>
          <h4>
            Name:<strong> Mia Fulgueras</strong>
          </h4>
          <br></br>
          <h4>
            Position:<strong> Project Manager</strong>
          </h4>
          <br></br>
          <h4>
            She plays the lead role in planning, executing, monitoring,
            controlling and closing projects. Her duties include coordination
            and timely completion. She also encourages all participants to share
            their thoughts and opinions in order to complete the project
            successfully. She is also focused in the project documentation.
          </h4>
          <br></br>
        </CCol>
      </CRow>
      <br></br>
      <br />

      <CRow>
        <CCol lg={4} md={12}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <img src={ness} width="80%" />
          </div>
        </CCol>
        <CCol lg={8} md={12}>
          <br></br>

          <h4>
            Name: <strong>Mark Daniel J. Macapagong</strong>
          </h4>
          <br></br>
          <h4>
            Position:<strong> Technical Member</strong>
          </h4>
          <br></br>
          <h4>
            He concentrated on recording and assessing the design project's
            outcomes. Also, help in construction of device’s hardware and in
            Android Application development.
          </h4>
          <br></br>
        </CCol>
      </CRow>
      <br></br>
      <br />

      <CRow>
        <CCol lg={4} md={12}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <img src={bin} width="80%" />
          </div>
        </CCol>
        <CCol lg={8} md={12}>
          <br></br>

          <h4>
            Name: <strong>Marvin Montana</strong>
          </h4>
          <br></br>
          <h4>
            Position:<strong> Technical Head</strong>
          </h4>
          <br></br>
          <h4>
            He assisted in the research of accurate components for the design
            project and the hunt for testers for the product. Also, help in
            construction of device’s hardware.
          </h4>
          <br></br>
        </CCol>
      </CRow>
    </div>
  );
}

export default Members;
