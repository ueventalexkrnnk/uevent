import React from "react";
import { useLocation, Link } from "react-router-dom";
import authStore from "../store/UserStore";
import {useContext} from "react";
import { Context } from '../index'

const Navbar = () => {
  const location = useLocation();

  // statusUser

  const {user} = useContext(Context)
  // if(status == 'organiser')
  //   authStore.isСompany()

  return (
    <div class="d-flex mx-auto">
      {/* {authStore.isСompany() &&  */}
        <Link to={"/myevents"} className="YourAds">
          <button
            className={
              location.pathname === "/myevents" ? "selectNavBtn" : "navBtn"
            }
          >
            My events
          </button>
        </Link>
      {/* } */}
      <Link to={"/tickets"} className="YourAds">
        <button
          className={
            location.pathname === "/tickets" ? "selectNavBtn" : "navBtn"
          }
        >
          Tickets
        </button>
      </Link>

      <Link to={"/favorites"} className="YourAds">
        <button
          className={
            location.pathname === "/favorites" ? "selectNavBtn" : "navBtn"
          }
        >
          Favorites
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
