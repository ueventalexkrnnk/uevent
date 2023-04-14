import React from "react";
import logo from "../img/Profile/bandatra.png";
import { Link } from "react-router-dom";

const UserPage = () => {
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
              <h5>About</h5>
              <div>
                lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem
                ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum
                dolor sit amet
              </div>
            </div>
            <div class="mt-3 d-flex ">
              <button class="profileBut">
                <Link to={"/user/events"} class="text-decoration-none">
                  <h3 class="text-dark">User`s events</h3>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserPage;
