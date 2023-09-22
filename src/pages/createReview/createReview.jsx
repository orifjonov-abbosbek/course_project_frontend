// src/components/ReviewForm.js
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import API_KEY from "../../api/api";

import Header from "../../components/Header/Header";

import "./createReview.scss";
import axios from "axios";

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    reviewName: "",
    reviewedItem: "",
    group: "",
    tags: "",
    reviewText: "",
    rating: "",
  });
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("reviewName", formData.reviewName);
    formDataToSend.append("reviewedItem", formData.reviewedItem);
    formDataToSend.append("group", formData.group);
    formDataToSend.append("tags", formData.tags);
    formDataToSend.append("reviewText", formData.reviewText);
    formDataToSend.append("rating", formData.rating);
    if (file) {
      formDataToSend.append("image", file);
    }

    try {
      const response = await axios.post(
        "YOUR_SERVER_URL/api/reviews",
        formDataToSend,
        {
          headers: {
          },
        }
      );

      if (response.status === 201) {
      
        console.log("Review created successfully");
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="createReview_container">
        <h2>Create a Review</h2>
        <form onSubmit={handleSubmit}>
          {/* Review Name */}
          <div className="form-group">
            <label htmlFor="reviewName">Review Name:</label>
            <input
              type="text"
              id="reviewName"
              name="reviewName"
              value={formData.reviewName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Reviewed Item */}
          <div className="form-group">
            <label htmlFor="reviewedItem">Reviewed Item:</label>
            <input
              type="text"
              id="reviewedItem"
              name="reviewedItem"
              value={formData.reviewedItem}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Group */}
          <div className="form-group">
            <label htmlFor="group">Group:</label>
            <input
              type="text"
              id="group"
              name="group"
              value={formData.group}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Tags */}
          <div className="form-group">
            <label htmlFor="tags">Tags:</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Comma-separated tags"
              required
            />
          </div>

          {/* Review Text */}
          <div className="form-group">
            <label htmlFor="reviewText">Review Text:</label>
            <textarea
              id="reviewText"
              name="reviewText"
              value={formData.reviewText}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Rating */}
          <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="0"
              max="10"
              step="0.1"
              value={formData.rating}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <Dropzone onDrop={handleFileDrop} accept="image/*">
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop an image here, or click to select one</p>
                </div>
              )}
            </Dropzone>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default ReviewForm;
