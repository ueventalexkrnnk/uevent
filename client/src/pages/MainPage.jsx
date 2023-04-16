import React from 'react';

import SearchBar from "../components/SearchBar.jsx";
import Events from '../components/Events.jsx';
import Scroll from '../components/Scroll.jsx';
import MainpEventComponent from "../components/MainpEventComponent.jsx";

const MainPage = () => {
  const [events, setEvents] = React.useState([
    <MainpEventComponent />,
    <MainpEventComponent />,
    <MainpEventComponent />
  ]);
  const [currentEvents, setCurrentEvents] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  return (
    <main>
      <div class="mainWrapper">
        <SearchBar />
        <div class="flex-grow-1 ms-5 mt-3">
          {currentEvents.map(item => item)}
        </div>
      </div>
      <Scroll setCurrentPage={setCurrentPage} currentPage={currentPage} eventsItem={events} setCurrentEvents={setCurrentEvents} />
    </main>
  );
}
export default MainPage;