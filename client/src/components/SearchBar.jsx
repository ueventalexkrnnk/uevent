import React from 'react';
import '../App.css';
import MyButton from "../components/MyButton.jsx"


class SearchBar extends React.Component
{   
    render()
    {
        return (
          <div class="col-12 col-md-3">
            <div class="menu">
              <div class="row">
                <div class="col-md-10">
                  <input
                    class="MenuInput"
                    type="text"
                    placeholder="Default input"
                  />
                </div>
                <div class="col-md-2">
                  <button className="myButton">Search</button>
                </div>
              </div>
              <div class="Price">
                <p>Price</p>
                <div class="row">
                  <div class="col-md-4 ">
                    <input class="MenuInput" type="number" placeholder="Min" />
                  </div>
                  <div class="col-md-1">
                    <p>—</p>
                  </div>
                  <div class="col-md-4 ">
                    <input class="MenuInput" type="number" placeholder="Max" />
                  </div>
                </div>
              </div>
              <div class="Year">
                <p>Year</p>
                <div class="row">
                  <div class="col-md-9 ">
                    <input class="MenuInput" type="date" placeholder="Date" />
                  </div>
                </div>
              </div>
              <div class="Transmission">
                <p>Type</p>
                <div class="row">
                  <div class="col-md-12 ">
                    <select class="custom-select">
                      <option value="Party">Party</option>
                      <option value="Bisnes">Bisnes-Trening</option>
                      <option value="Caraoke">Caraoke</option>
                      <option value="korocze">Hz korocze</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
export default SearchBar;