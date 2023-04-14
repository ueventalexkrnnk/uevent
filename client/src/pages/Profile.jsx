import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import logo from "../img/Profile/bandatra.png";
import ChangeAv from "../components/ChangeAvatar.jsx";

const Settings = () => {
  // const getNick = () => {
  //   dasd
  // }

  return (
    <main>
      <div class="container p-2 pt-5 ">
        <div class="d-flex justify-content-center">
          <div class="w-25">
            <img src={logo} class=" rounded-circle" />
            <h1 class="">Nick</h1>
          </div>
          <div class="ms-5 ">
            <div>
              <h3>Change avatar</h3>
              <ChangeAv />
            </div>
            <div class="mt-3 d-flex ">
              <button class="profileBut">
                <Link to={"/profile/changedata"} class="text-decoration-none">
                  <h3 class="text-dark">Change user data</h3>
                </Link>
              </button>
            </div>
            <div class="mt-3 d-flex ">
              <button class="profileBut">
                <Link to={"/profile/adminpanel"} class="text-decoration-none">
                  <h3 class="text-dark">Admin panel</h3>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;
