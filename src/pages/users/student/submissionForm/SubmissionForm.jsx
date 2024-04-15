import React, { useState, useEffect } from 'react';
import './submissionForm.css'; // Import your CSS file for styling
import SideMenu from '../sideMenu/SideMenu';

const SubmissionForm = () => {
  // State for form fields and errors
  const [formData, setFormData] = useState({
    studentName: '',
    magazineTitle: '',
    magazineContent: '',
    coverImage: null,
    document: null
  });
  const [formErrors, setFormErrors] = useState({});

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    const errors = {};
    if (!formData.studentName.trim()) {
      errors.studentName = 'Student name is required';
    }
    if (!formData.magazineTitle.trim()) {
      errors.magazineTitle = 'Magazine title is required';
    }
    if (!formData.magazineContent.trim()) {
      errors.magazineContent = 'Magazine content is required';
    }
    if (!formData.coverImage) {
      errors.coverImage = 'Cover image is required';
    }
    if (!formData.document) {
      errors.document = 'Document is required';
    }
    if (Object.keys(errors).length === 0) {
      try {
        // Form is valid, send data to backend
        const formDataToSend = new FormData();
        formDataToSend.append('studentName', formData.studentName);
        formDataToSend.append('magazineTitle', formData.magazineTitle);
        formDataToSend.append('magazineContent', formData.magazineContent);
        formDataToSend.append('coverImage', formData.coverImage);
        formDataToSend.append('document', formData.document);
        
        const response = await fetch('http://localhost:5000/submitMagazine', {
          method: 'POST',
          body: formDataToSend,
        });

        if (response.ok) {
          console.log('Magazine submitted successfully');
          // Reset form fields
          setFormData({
            studentName: '',
            magazineTitle: '',
            magazineContent: '',
            coverImage: null,
            document: null
          });
        } else {
          console.error('Failed to submit magazine:', response.statusText);
        }
      } catch (error) {
        console.error('Error submitting magazine:', error);
      }
    } else {
      // Set formErrors state to display error messages
      setFormErrors(errors);
    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
    // Clear error message when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const username = searchParams.get('username');
    if (username) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        studentName: username
      }));
    }
  }, []);

  return (
    <div className="submission-form">
      <SideMenu/>
      <h2>Submit Your Magazine</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        </div>
        <div className="form-group">
          <label htmlFor="magazineTitle">Magazine Title:</label>
          <input
            type="text"
            id="magazineTitle"
            name="magazineTitle"
            value={formData.magazineTitle}
            onChange={handleChange}
          />
          {formErrors.magazineTitle && (
            <span className="error">{formErrors.magazineTitle}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="magazineContent">Magazine Content:</label>
          <textarea
            id="magazineContent"
            name="magazineContent"
            value={formData.magazineContent}
            onChange={handleChange}
          ></textarea>
          {formErrors.magazineContent && (
            <span className="error">{formErrors.magazineContent}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="coverImage">Cover Image:</label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
          />
          {formData.coverImage && (
            <img src={URL.createObjectURL(formData.coverImage)} alt="Cover preview" className="preview" />
          )}
          {formErrors.coverImage && (
            <span className="error">{formErrors.coverImage}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="document">Document (PDF):</label>
          <input
            type="file"
            id="document"
            name="document"
            accept=".pdf"
            onChange={handleChange}
          />
          {formData.document && (
            <embed src={URL.createObjectURL(formData.document)} type="application/pdf" width="100%" height="500px" className="preview" />
          )}
          {formErrors.document && (
            <span className="error">{formErrors.document}</span>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmissionForm;
