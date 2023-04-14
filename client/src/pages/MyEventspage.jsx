import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import SearchBar from "../components/SearchBar.jsx";
import Scroll from "../components/Scroll.jsx";
import MyEventComponent from "../components/MyEventComponent.jsx";

const MyEvents = () => {

    return (
      <main>
        <div class="container">
          <div class="row">
            <SearchBar />
            <div class="col-12  col-md-9">
              <div class="product">
                <MyEventComponent />
                <MyEventComponent />
                <MyEventComponent />
              </div>
            </div>
            <Scroll  />
          </div>
        </div>
      </main>
    );
}
export default MyEvents;
