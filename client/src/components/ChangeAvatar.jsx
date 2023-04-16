import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Axios from 'axios'

const ChangeAvatar = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedFile)
    const formData = new FormData();
      formData.append('image', selectedFile);

      console.log(formData);
      const response = await Axios.post('http://localhost:5000/api/user/avatar', formData, {withCredentials: true });
      console.log(response);
    // Use selectedFile to upload the photo to the server
    // Axios.post('http://localhost:5000/api/user/avatar', {
    //   image: selectedFile,
    // }, {withCredentials: true}).then((res) => {
    //     console.log(res)
    // })
  };


  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" name="image" onChange={handleFileSelect} />
        </Form.Group>
        <button className="myButton" type="submit" >Upload</button>
      </Form>
    </>
  );
};

export default ChangeAvatar;
