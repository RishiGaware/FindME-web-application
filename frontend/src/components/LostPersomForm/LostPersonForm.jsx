import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './LostPersonForm.module.css';
import Navbar from '../Navbar/Navbar';
import UserContext from '../../context/UserContext';

const LostPersonForm = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    aadhar: '',
    city: '',
    state: '',
    age: '', // Add age to the form data
    picture: null,
  });

  const [fileName, setFileName] = useState(''); // State for file name

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      picture: file,
    });

    // Set the file name
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(''); // Reset file name if no file is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    // Create a FormData object to send the data
    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('phone', formData.phone);
    dataToSend.append('address', formData.address);
    dataToSend.append('aadhar', formData.aadhar);
    dataToSend.append('city', formData.city);
    dataToSend.append('state', formData.state);
    dataToSend.append('age', formData.age); // Append age to the FormData
    dataToSend.append('picture', formData.picture);
    dataToSend.append('userId', user.userId); // User ID from context
    dataToSend.append('role', user.role); // User role from context

    try {
      const response = await fetch('http://localhost:3000/user/lost-person', {
        method: 'POST',
        body: dataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);

      // Redirect to /YourList after successful form submission
      navigate('/YourList');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.heading}>Fill in the details of the lost person</h1>
        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className={styles.form__group}>
              <label className={styles.form__label}>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.form__input}
                required
              />
            </div>

            {/* Phone Number */}
            <div className={styles.form__group}>
              <label className={styles.form__label}>Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.form__input}
                required
              />
            </div>

            {/* Address */}
            <div className={styles.form__group}>
              <label className={styles.form__label}>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={styles.form__input}
                required
              />
            </div>

            {/* Aadhar Card Number */}
            <div className={styles.form__group}>
              <label className={styles.form__label}>Aadhar Card Number:</label>
              <input
                type="text"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
                className={styles.form__input}
                required
              />
            </div>

            {/* City of Loss */}
            <div className={styles.form__group}>
              <label className={styles.form__label}>City of Loss:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={styles.form__input}
                required
              />
            </div>

            {/* State of Discovery */}
            <div className={styles.form__group}>
              <label className={styles.form__label}>State :</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={styles.form__input}
                required
              />
            </div>

            {/* Age */}
            <div className={styles.form__group}>
              <label className={styles.form__label}>Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={styles.form__input}
                required
              />
            </div>

            {/* Picture Upload */}
            <div className={styles.form__group}>
              <label className={styles.form__label}>Choose a picture:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.choosepicture}
                required
              />
            </div>

            {/* Display the file name if one is selected */}
            {fileName && (
              <div className={styles.fileName}>
                <p>Selected File: {fileName}</p>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className={styles.button}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LostPersonForm;
