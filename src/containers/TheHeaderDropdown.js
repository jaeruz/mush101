import React, { useEffect } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import Avatar from "react-avatar";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "src/Actions";
import { useHistory, useLocation } from "react-router-dom";

const TheHeaderDropdown = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authDetails = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(authDetails);
  }, [authDetails]);

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <Avatar
            size="35"
            name={
              authDetails.profile
                ? authDetails.profile.fname + " " + authDetails.profile.lname
                : "K T"
            }
            round={true}
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem>

        <CDropdownItem
          onClick={() => history.push("/users/" + authDetails.UID)}
        >
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>

        <CDropdownItem divider />
        <CDropdownItem onClick={() => dispatch(logOut())}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
