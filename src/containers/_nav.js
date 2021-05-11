import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Actions"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Controls",
    to: "/controls",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Mushroom Cycle",
    to: "/",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Information"], //infos
  },
  {
    _tag: "CSidebarNavItem",
    name: "Notifications",
    to: "/notifications",
    icon: "cil-cursor",
    badge: {
      color: "danger",
      text: 2,
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Logs",
    route: "/buttons",
    icon: "cil-cursor",
  },

  {
    _tag: "CSidebarNavDivider",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Extras"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "About",
    route: "/base",
    icon: "cil-puzzle",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Mushroom Life Cycle",
        to: "/base/breadcrumbs",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Mushroom Procedures",
        to: "/base/cards",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Mushroom Products",
        to: "/base/cards",
      },
    ],
  },
];

export default _nav;
