import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import "./createReview.scss";
import Previews from "../../components/DragNdrop/Drag";

const CreateReviewForm = () => {
  const [formData, setFormData] = useState({
    reviewName: "",
    reviewedItem: "",
    group: "",
    tags: "",
    reviewText: "",
    rating: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  console.log(token)

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileDrop = (droppedImage) => {
    setFile(droppedImage);
    console.log(file)
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
        "http://localhost:3000/reviews",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Review created successfully");
      } else {
        setError("Failed to create the review.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating the review.");
    }
  };

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  return (
    <div className="">
      <Header />
      <div className="createReview_container">
        <h2>Create a Review</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Review Name"
            name="reviewName"
            type="text"
            value={formData.reviewName}
            onChange={handleInputChange}
            required
          />
          <FormInput
            label="Reviewed Item"
            name="reviewedItem"
            type="text"
            value={formData.reviewedItem}
            onChange={handleInputChange}
            required
          />
          <FormInput
            label="Group"
            name="group"
            type="text"
            value={formData.group}
            onChange={handleInputChange}
            required
          />
          <FormInput
            label="Tags"
            name="tags"
            type="text"
            value={
              Array.isArray(formData.tags)
                ? formData.tags.join(",")
                : formData.tags
            }
            onChange={handleInputChange}
            placeholder="Comma-separated tags"
            required
          />

          <FormInput
            label="Review Text"
            name="reviewText"
            type="textarea"
            value={formData.reviewText}
            onChange={handleInputChange}
            required
          />
          <FormInput
            label="Rating"
            name="rating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={formData.rating}
            onChange={handleInputChange}
            required
          />

          <div className="form-group">
            <label>Upload Image:</label>
            {!file ? (
              <Previews onImageDrop={handleFileDrop} />
            ) : (
              <div>
                <p>File Uploaded: {file.name}</p>
                <button onClick={() => setFile(null)}>Remove</button>
              </div>
            )}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

const FormInput = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
};

export default CreateReviewForm;
