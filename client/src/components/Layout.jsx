import React from "react";
import {useLocation} from "react-router-dom"
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export const Layout = ({ children }) => {
  // const location = useLocation();
  // let ban = true;
  // if (location.pathname == "/login" || "/register" || "/confirm-message" || "/forgotPassword" || "/send-password-link/:token" || "/confirm-email/:token") {
  //   ban = false
  // }
  // else
  // {
  //   ban = true;
  // }

  // alert(ban)

  return (
    <React.Fragment>
      
      <div class="wrapper">
        <Header />
        {/* {(ban == true) && <Header />} */}
        {children}
      </div>
      {/* {(ban == true) && <Footer />} */}
    </React.Fragment>
  );
};
