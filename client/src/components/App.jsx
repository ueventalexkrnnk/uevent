import React from "react";
import { useContext } from "react";
import { Layout } from "./Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "../index";

// =============
import authStore from "../store/UserStore";
// =============
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "../Style.css";    

import MainPage from "../pages/MainPage";
import MyEvents from "../pages/MyEventspage.jsx";
import Tickets from "../pages/Tickets.jsx";
import CreateEvent from "../pages/CreateEventPage.jsx";
import Profile from "../pages/Profile.jsx";
import ChangeDataPage from "../pages/ChangeData";
import NotFoundpage from "../pages/NotFoundpage.jsx";
import AdminPanel from "../pages/AdminPanel.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Registration.jsx";
import ProductOwerview from "../pages/ProductOwerview.jsx";
import WaitingForMail from "../pages/WaitingForMail.jsx";
import UserPage from "../pages/UserPage.jsx"
import Favorites from "../pages/Favorites.jsx"
import ConfirmEmail from "../pages/ConfirmEmail.jsx"
import FormForgotPassword from "../pages/ForgotPassword.jsx"
import ResetPassword from "../pages/ResetPassword.jsx"


const App = () => {
  const {user} = useContext(Context)

  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  if(getCookie('token')) user.setIsAuth(true)
  if(getCookie('status') == 'organiser') user.setIsOrganiser(true)
  if(getCookie('status') == 'admin') user.setIsAdmin(true)

  return (
    <Layout>
      <Routes>
        <Route path="/warning" element={<NotFoundpage />} />
        <Route path="/main" element={<MainPage />} />

        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/createevent" element={<CreateEvent />} />


        <Route path="/tickets" element={<Tickets />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/changedata" element={<ChangeDataPage />} />
        <Route path="/profile/adminpanel" element={<AdminPanel />} />
        <Route path="/productOwerview" element={<ProductOwerview />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/favorites" element={<Favorites />} />
        

        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirm-message" element={<WaitingForMail />} />
        <Route path="/confirm-email/:token" element={<ConfirmEmail />} />
        <Route path="/forgotPassword" element={<FormForgotPassword />} />
        <Route path="/send-password-link/:token" element={<ResetPassword />} />

      </Routes>
    </Layout>
  );
};

export default App;
