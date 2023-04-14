import { React, useState } from "react";
import "../App.css";
import { Form } from "react-bootstrap";
import ImportFoto from "../img/AddFoto.png";

const CreateEvent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Use selectedFile to upload the photo to the server
  };
  return (
    <main>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-3">
            <div class="menu">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>
                    <div class="row">
                      <img src={ImportFoto} className="ImportFoto1"></img>
                    </div>
                  </Form.Label>
                  <Form.Control
                    className="d-none"
                    type="file"
                    onChange={handleFileSelect}
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
          <div class="col-12  col-md-9">
            <div class="AddProduct">
              <div class="col-md-9">
                <input
                  type="text"
                  placeholder="Title"
                  className="AddProductInput"
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="AddProductInput"
                />
              </div>
              <div class="col-md-9">
                <input
                  type="number"
                  placeholder="Price $"
                  className="AddProductInput"
                  id="Price"
                />
                <input
                  type="date"
                  placeholder="Date"
                  className="AddProductInput"
                />
              </div>
              <div class="col-md-9">
                <div class="NameSelect">
                  <div class="row">
                    <div class="col-md-3">
                      <p>Type</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-9">
                <select class="custom-select">
                  <option value="Mechanic">Party</option>
                  <option value="Automatic">Bisnes-Trening</option>
                  <option value="Automatic">Caraoke</option>
                  <option value="Automatic">Hz korocze</option>
                </select>
              </div>
              <div class="col-md-9">
                <p class="AddDescriptionP">Description</p>
                <textarea cols="30" rows="3" class="AddDescription"></textarea>
              </div>
              <div class="col-md-9">
                <input className="myCrEventBut" type="button" value="Publish" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateEvent;
