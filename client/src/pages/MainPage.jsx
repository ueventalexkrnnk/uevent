import React from 'react';

import SearchBar from "../components/SearchBar.jsx";
import Events from '../components/Events.jsx';
import Scroll  from '../components/Scroll.jsx';
import MainpEventComponent from "../components/MainpEventComponent.jsx";

const MainPage = () =>
{   
        return (
          <main>
            <div class="mainWrapper">
              <SearchBar />
              <div class="flex-grow-1 ms-5 mt-3">
                <MainpEventComponent />
                <MainpEventComponent />
                <MainpEventComponent />
              </div>
            </div>
          </main>
        );
}
export default MainPage;