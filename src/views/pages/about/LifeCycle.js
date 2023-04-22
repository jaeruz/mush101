import { CCol, CRow } from "@coreui/react";
import React from "react";
import oyst from "../../../assets/icons/OysterMushroom.jpg";
import er from "../../../assets/icons/yest.png";
import purple from "../../../assets/icons/purple.jpg";

function LifeCycle() {
  return (
    <div>
      <div>
        <CRow>
          <CCol lg={6} md={12}>
            <img
              src={oyst}
              width="100%"
              height="300px"
              style={{ padding: "15px" }}
            ></img>
          </CCol>
          <CCol lg={6} md={12}>
            <br></br>
            <br></br>
            <h1>What is Mushroom?</h1>
            <p>
              Mushrooms are known as vegetables in the world of food, but they
              are actually not plants. They belong to the Kingdom of Fungi. This
              is a natural food with a lot of nutritional benefits. The
              mushrooms we eat are generally composed of stipe(stem),
              pileus(cap), and lamellae(gills). There are approximately 14,000
              different species of mushroom, many of which are inedible.
            </p>
            <br></br>
          </CCol>
        </CRow>
      </div>
      <br></br>
      <br></br>
      <div>
        <h1>What do Mushroom do?</h1>
        <CRow>
          <CCol lg={4} md={12}>
            <h2>Decomposers</h2>
            <p>
              Some mushrooms are capable of digesting wood, breaking it down
              into the primary components of forest soils. They also decay other
              dead plant and animal matter.
            </p>
          </CCol>
          <CCol lg={4} md={12}>
            <h2>Tree Helper</h2>
            <p>
              The mushroom helps the tree extract minerals and water from the
              soil; in exchange, the tree supplies the mushroom with sugar
              compounds{" "}
            </p>
          </CCol>
          <CCol lg={4} md={12}>
            <h2>Food</h2>
            <p>
              Mushrooms figure prominently in the human diet. Morels, shiitake
              mushrooms, chanterelles, and truffles are considered delicacies.
            </p>
          </CCol>
        </CRow>
      </div>
      <br></br>
      <br></br>
      <div>
        <CRow>
          <CCol lg={2}></CCol>
          <CCol lg={8} md={12}>
            <h1 style={{ textAlign: "center" }}>Mushroom Cycle</h1>
            <img src={er} width="100%" height="500px"></img>
          </CCol>
          <CCol lg={2}></CCol>
        </CRow>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default LifeCycle;
