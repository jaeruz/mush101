import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
} from "@coreui/react";

import firebase from "../../api/fbConfig";

import usersData from "./UsersData";
import { useSelector } from "react-redux";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const Users = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const authDetails = useSelector((state) => state.auth);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const users = firebase.database().ref("users");
    users.on("value", async (snapshot) => {
      const tempList = snapshot.val().registered;
      const temp = [];
      Object.keys(tempList).map((key, index) => {
        temp.push(tempList[key]);
      });
      setUserList(temp);
    });
  }, []);

  useEffect(() => {
    console.log(userList);
  }, [userList]);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  return (
    <CRow>
      <CCol lg={1}></CCol>
      <CCol xl={10}>
        <CCard>
          <CCardHeader>
            Users
            <small className="text-muted"> example</small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={userList.length ? userList : []}
              fields={[
                { key: "username", _classes: "font-weight-bold" },
                "fname",
                "lname",
                "email",
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.id}`)}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={5}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol lg={1}></CCol>
    </CRow>
  );
};

export default Users;
