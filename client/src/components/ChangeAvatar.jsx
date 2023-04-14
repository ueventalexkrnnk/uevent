import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const ChangeAvatar = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Use selectedFile to upload the photo to the server
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" onChange={handleFileSelect} />
        </Form.Group>
        <button className="myButton" type="submit">Upload</button>
      </Form>
    </>
  );
};

export default ChangeAvatar;
