import { CCol, CRow } from "@coreui/react";
import React from "react";
import spawn from "../../../assets/icons/spawn.png";
import substrate from "../../../assets/icons/substrate.png";
import mix from "../../../assets/icons/mix.png";
import incu from "../../../assets/icons/incubation.png";
import fruiting from "../../../assets/icons/fruiting.png";
import harvest from "../../../assets/icons/harvest.png";

function Procedures() {
  return (
    <div>
      <div>
        <CRow>
          <CCol lg={2}></CCol>
          <CCol lg={9} md={12}>
            <h1>Monotub Mushroom Production Process</h1>
          </CCol>
          <CCol lg={1}></CCol>
        </CRow>

        <br></br>
        <br></br>
        <h2 style={{ textAlign: "center", border: "2px solid purple" }}>
          Raw Materials
        </h2>
        <br></br>
        <br></br>
        <CRow>
          <CCol lg={3}></CCol>
          <CCol lg={3} md={12}>
            <img src={spawn} width="110%" height="100%"></img>
          </CCol>
          <CCol lg={3} md={12}>
            <img src={substrate} width="110%" height="100%"></img>
          </CCol>
          <CCol lg={3}></CCol>
        </CRow>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h2 style={{ textAlign: "center", border: "2px solid purple" }}>
          Mixed Raw Materials
        </h2>
        <CRow>
          <CCol lg={4}></CCol>
          <CCol lg={4} md={12}>
            <br></br>
            <br></br>
            <img src={mix} width="100%" height="80%"></img>
          </CCol>
          <CCol lg={4}></CCol>
        </CRow>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <h2 style={{ textAlign: "center", border: "2px solid purple" }}>
          Incubation
        </h2>
        <CRow>
          <CCol lg={4}></CCol>
          <CCol lg={4} md={12}>
            <br></br>
            <br></br>
            <img src={incu} width="100%" height="80%"></img>
          </CCol>
          <CCol lg={4}></CCol>
        </CRow>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h2 style={{ textAlign: "center", border: "2px solid purple" }}>
          Fruiting Stage
        </h2>
        <CRow>
          <CCol lg={4}></CCol>
          <CCol lg={4} md={12}>
            <br></br>
            <br></br>
            <img src={fruiting} width="100%" height="50%"></img>
          </CCol>
          <CCol lg={4}></CCol>
        </CRow>

        <h2 style={{ textAlign: "center", border: "2px solid purple" }}>
          Harvest
        </h2>
        <CRow>
          <CCol lg={4}></CCol>
          <CCol lg={4} md={12}>
            <br></br>
            <br></br>
            <img src={harvest} width="100%" height="50%"></img>
          </CCol>
          <CCol lg={4}></CCol>
        </CRow>
      </div>
    </div>
  );
}

export default Procedures;
