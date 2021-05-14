import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_nav";
import { updateSidebar } from "src/Actions";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.changeState);
  useEffect(() => {
    console.log(show);
  }, [show]);
  return (
    <CSidebar show={show} onShowChange={(val) => dispatch(updateSidebar(val))}>
      <CSidebarBrand className="d-md-down-none" to="/">
        <h4 className="c-sidebar-brand-full">KabuTech V2.1.1.2</h4>
        <h4 className="c-sidebar-brand-minimized">K</h4>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
