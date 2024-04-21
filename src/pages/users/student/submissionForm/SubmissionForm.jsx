import React, { useState, useEffect } from 'react';
import './submissionForm.css'; // Import your CSS file for styling
import SideMenu from '../sideMenu/SideMenu';

const SubmissionForm = () => {
  // State for form fields and errors
  const [formData, setFormData] = useState({
    studentName: '',
    faculty: '',
    magazineTitle: '',
    magazineContent: '',
    coverImage: null,
    document: null,
    submissionDate: new Date().toISOString(), // Default submission date
    submissionStatus: 'pending' // Default submission status
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
        // Append form data to formDataToSend
        formDataToSend.append('studentName', formData.studentName);
        formDataToSend.append('faculty', formData.faculty);
        formDataToSend.append('magazineTitle', formData.magazineTitle);
        formDataToSend.append('magazineContent', formData.magazineContent);
        formDataToSend.append('coverImage', formData.coverImage);
        formDataToSend.append('document', formData.document);
        formDataToSend.append('submissionDate', formData.submissionDate); // Include submission date
        formDataToSend.append('submissionStatus', formData.submissionStatus); // Include submission status

        // Send formDataToSend to the server
        const response = await fetch('http://localhost:5000/submitMagazine', {
          method: 'POST',
          body: formDataToSend,
        });

        if (response.ok) {
          console.log('Magazine submitted successfully');
          // Reset form fields
          setFormData({
            studentName: '',
            faculty: '',
            magazineTitle: '',
            magazineContent: '',
            coverImage: null,
            document: null,
            submissionDate: new Date().toISOString(), // Reset submission date to current date
            submissionStatus: 'Pending' // Reset submission status to pending
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
      // No need to handle file changes here since Multer will handle it
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
      // Fetch faculty based on the username
      fetch(`http://localhost:5000/getFaculty?username=${username}`)
        .then(response => response.json())
        .then(data => {
          if (data.faculty) {
            setFormData(prevFormData => ({
              ...prevFormData,
              faculty: data.faculty
            }));
          } else {
            console.error('Faculty not found for username:', username);
          }
        })
        .catch(error => console.error('Error fetching faculty:', error));
    }
  }, []);

  // Function to format date and time in Hanoi timezone
  const formatSubmissionDate = () => {
    const submissionDate = new Date(formData.submissionDate);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Ho_Chi_Minh', // Hanoi timezone (Indochina Time - ICT)
    };
    return submissionDate.toLocaleString('en-US', options);
  };

  return (
    <div className="submission-form">
      <SideMenu/>
      <h2>Submit Your Magazine</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="studentName">Username:</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            disabled // Disable user input
          />
        </div>
        <div className="form-group">
          <label htmlFor="faculty">Faculty:</label>
          <input
            type="text"
            id="faculty"
            name="faculty"
            value={formData.faculty}
            disabled // Disable user input
          />
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
        {/* Include submission date and status */}
        <div className="form-group">
          <label htmlFor="submissionDate">Submission Date:</label>
          <input
            type="text"
            id="submissionDate"
            name="submissionDate"
            value={formatSubmissionDate()}
            readOnly // Make the input field read-only
          />
        </div>
        <input type="hidden" name="submissionStatus" value={formData.submissionStatus} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmissionForm;
