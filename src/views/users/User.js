import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import firebase from "../../api/fbConfig";

import usersData from "./UsersData";
import { useSelector } from "react-redux";

const User = ({ match }) => {
  const [specificUser, setSpecificUser] = useState(null);
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
    if (userList.length) {
      const tempUserList = userList.find(
        (user) => user.id.toString() === match.params.id
      );
      setSpecificUser(tempUserList);
    }
  }, [userList]);

  useEffect(() => {
    console.log(specificUser);
  }, [specificUser]);

  // const userDetails = specificUser ? Object.entries(specificUser) : null;

  return (
    <CRow>
      <CCol lg={1}></CCol>
      <CCol lg={10}>
        <CCard>
          <CCardHeader>User id: {match.params.id}</CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {specificUser ? (
                  Object.entries(specificUser).map(([key, value], index) => {
                    return (
                      <div>
                        {key === "confirmPassword" ||
                        key === "password" ? null : (
                          <tr key={index.toString()}>
                            <td>{`${key}:`}</td>
                            <td>
                              <strong>{value}</strong>
                            </td>
                          </tr>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p>Loading..</p>
                )}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol lg={1}></CCol>
    </CRow>
  );
};

export default User;
