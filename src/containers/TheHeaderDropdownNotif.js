import React, { useEffect, useState } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
} from "@coreui/react";
import firebase from "../api/fbConfig";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router";

const TheHeaderDropdownNotif = () => {
  const history = useHistory();
  const [notifs, setNotifs] = useState([]);
  const [newNotif, setNewNotif] = useState([]);

  useEffect(() => {
    const notifications = firebase.database().ref("notifications");

    notifications.on("value", async (snapshot) => {
      setNotifs(snapshot.val());
    });
  }, []);

  useEffect(() => {
    if (notifs.length) {
      let temp = [];
      for (let i = 0; i != notifs.length; i++) {
        if (!notifs[i].isChecked) {
          temp.push(notifs[i]);
        }
      }
      setNewNotif(temp);
    }
  }, [notifs]);

  useEffect(() => {
    console.log(newNotif);
  }, [newNotif]);

  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" />
        {newNotif.length ? (
          <CBadge shape="pill" color="danger">
            {newNotif.length}
          </CBadge>
        ) : null}
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>You have new {newNotif.length} notifications</strong>
        </CDropdownItem>
        {newNotif.length ? (
          newNotif.map((n, index) => {
            return (
              <CDropdownItem
                key={index}
                style={{ fontWeight: "bold" }}
                onClick={() => history.push("/notifications")}
              >
                <CIcon name="cil-bell" className="mr-2 text-success" />
                {n.type}
              </CDropdownItem>
            );
          })
        ) : (
          <CDropdownItem onClick={() => history.push("/notifications")}>
            <CIcon name="cil-chart-pie" className="mr-2 text-info" /> View all
          </CDropdownItem>
        )}

        {/* <CDropdownItem header tag="div" color="light">
          <strong>Mushroom Cycle</strong>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small>
              <b>Cycle #1252</b>
            </small>
          </div>
          <CProgress size="xs" color="info" value={5} />
          <small className="text-muted">5% before Harvest</small>
        </CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownNotif;
