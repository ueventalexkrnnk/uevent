import { Link } from "react-router-dom";
import eventlogo from "../img/lviv.virtual.jpg";

const MainpEventComponent = () => {
  return (
    <div class="eventCompM p-3">
      <Link to="/productOwerview" class=" text-decoration-none text-black">
        <div class="d-flex ">
          <h4>Title</h4>
          <p class="ms-auto">date</p>
        </div>
        <div class="d-flex">
          <div class="eventImg flex-shrink-0">
            <img src={eventlogo} />
          </div>
          <div class="flex-grow-1 ms-3">
            <div class="d-flex">
              <h5>Avtor</h5>
              <h5 class="ms-auto">500grn</h5>
            </div>
            <div class="d-flex">
              <h5>Type</h5>
              <h6 class="ms-auto">12 tickets</h6>
            </div>
            <h6>Description</h6>
            <div class="flex-wrap">
              loremipsum dolor sit awdwdaf faf loremipsum dolor sit awdwdaf faf
              loremipsum dolor sit awdwdaf faf loremipsum dolor sit awdwdaf faf
              loremipsum dolor sit awdwdaf faf loremipsum dolor sit awdwdaf faf
              loremipsum dolor sit awdwdaf faf loremipsum dolor sit awdwdaf faf
            </div>
          </div>
        </div>
      </Link>
      <div class="d-flex justify-content-between">
        <h5>Adress</h5>
        <h6>sub count</h6>
        <button className="eventButton">Buy</button>
      </div>
    </div>
  );
};

export default MainpEventComponent;
