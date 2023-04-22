import { CCol, CRow } from "@coreui/react";
import React from "react";
import cookies from "../../../assets/icons/cookies.jpg";
import chips from "../../../assets/icons/chip.jpg";
import pickled from "../../../assets/icons/pickled.jpg";
import dry from "../../../assets/icons/dry.jpg";
import powder from "../../../assets/icons/powder.jpg";
import purple from "../../../assets/icons/purple.jpg";

function Products() {
  return (
    <div>
      <CRow>
        <CCol lg={3}></CCol>
        <CCol lg={8} md={12}>
          <h1>Mushroom Product List </h1>
        </CCol>
        <CCol lg={2}></CCol>
      </CRow>
      <br></br>
      <br></br>
      <h2>
        <strong>1. Cookies Mushroom</strong>
      </h2>
      <CRow>
        <CCol lg={4} md={12}>
          <br></br>
          <img src={cookies} width="100%" height="80%"></img>
        </CCol>
        <CCol lg={8} md={12}>
          <br></br>
          <br></br>
          <br></br>
          <h5>
            The Mushroom Cookies Recipe are absolutely adorable fun and easy to
            make. Almost too cute to eat. They are wonderful dessert decor for
            just about any party or occasion. The eye-catchy treats attract not
            only to little ones but big ones too.
          </h5>
        </CCol>
      </CRow>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h2>
        <strong>2. Chips Mushroom</strong>
      </h2>
      <CRow>
        <CCol lg={8} md={12}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h5>
            Oyster mushrooms are tossed with seasonings, starch and egg, and
            deep fried. Mushroom fries are light and crisp, and outrageously
            good. Perfect snack or finger food to go with your cocktails.
          </h5>
        </CCol>
        <CCol lg={4} md={12}>
          <br></br>
          <img src={chips} width="100%" height="80%"></img>
        </CCol>
      </CRow>

      <br></br>
      <br></br>
      <br></br>
      <h2>
        <strong>3. Pickled Mushroom</strong>
      </h2>
      <CRow>
        <CCol lg={4} md={12}>
          <br></br>
          <img src={pickled} width="100%" height="100%"></img>
        </CCol>
        <CCol lg={8} md={12}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h5>
            Mushroom Pickle is prepared with milky mushrooms.the taste was
            amazing and it’s really a must try tasty and healthy recipe, you can
            also use button or oyster mushrooms for this preparation.
          </h5>
        </CCol>
      </CRow>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h2>
        <strong>4. Dry Mushroom</strong>
      </h2>
      <CRow>
        <CCol lg={8} md={12}>
          <br></br>
          <br></br>
          <br></br>
          <h5>
            Dried Mushrooms are mushrooms that have been deliberately dried in
            order to preserve them. Both wild and cultivated mushrooms are
            available dried. You can get packages of one single kind of dried
            mushroom, or packages of mixed varieties of mushrooms. Dried
            Mushrooms allows easy, year-round access to the flavours of wild
            mushrooms.
          </h5>
        </CCol>
        <CCol lg={4} md={12}>
          <br></br>
          <img src={dry} width="100%" height="100%"></img>
        </CCol>
      </CRow>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h2>
        <strong>5. Powdered Mushroom</strong>
      </h2>
      <CRow>
        <CCol lg={4} md={12}>
          <br></br>
          <img src={powder} width="100%" height="80%"></img>
        </CCol>
        <CCol lg={8} md={12}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h5>
            Mushroom powder is literally just dried mushrooms that have been
            pulverized into a powder. And it can be made out of any culinary
            mushroom! In addition to the nutritional benefits of mushroom
            powder, it also adds a mushrooms’ earthy, meaty flavor to whatever
            you mix it with.
          </h5>
        </CCol>
      </CRow>
      <br></br>
      <br></br>
    </div>
  );
}

export default Products;
