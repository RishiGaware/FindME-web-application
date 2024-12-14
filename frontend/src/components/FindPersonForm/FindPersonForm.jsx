import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './FindPersonForm.module.css';
import Navbar from '../Navbar/Navbar';
import UserContext from '../../context/UserContext';

const FindPersonForm = () => {
  const { user } = useContext(UserContext); 
  const navigate = useNavigate(); // Initialize the useNavigate hook
  console.log(user);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    state: '',
    age: '', // Add age to the state
    picture: null,
  });

  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

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

    if (file) {
      setFileName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName('');
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('state', formData.state);
    formDataToSend.append('age', formData.age); // Include age in the FormData
    formDataToSend.append('picture', formData.picture);
    
    // Add user data to FormData
    if (user && user.userId) {
      formDataToSend.append('userId', user.userId); // Assuming userId is available
      formDataToSend.append('userRole', user.role); // You can also send role or other details
    }

    try {
      const response = await fetch('http://localhost:3000/user/found-person', {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Form submitted successfully!');
        console.log('Server Response:', data);

        // Redirect to '/YourList' after successful submission
        navigate('/YourList');
      } else {
        const errorData = await response.json();
        setMessage(`Failed to submit the form: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.heading}>Fill the information of the Person you found</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.form__group}>
            <label className={styles.form__label}>Name: </label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className={styles.form__input}
              required 
              disabled={loading} 
            />
          </div>
          <div className={styles.form__group}>
            <label className={styles.form__label}>Phone Number: </label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              className={styles.form__input}
              required 
              disabled={loading} 
            />
          </div>
          <div className={styles.form__group}>
            <label className={styles.form__label}>City where you found them: </label>
            <input 
              type="text" 
              name="city" 
              value={formData.city} 
              onChange={handleChange} 
              className={styles.form__input}
              required 
              disabled={loading} 
            />
          </div>
          <div className={styles.form__group}>
            <label className={styles.form__label}>State where you found them: </label>
            <input 
              type="text" 
              name="state" 
              value={formData.state} 
              onChange={handleChange} 
              className={styles.form__input}
              required 
              disabled={loading} 
            />
          </div>
          <div className={styles.form__group}>
            <label className={styles.form__label}>Age: </label>
            <input 
              type="number" 
              name="age" 
              value={formData.age} 
              onChange={handleChange} 
              className={styles.form__input}
              required 
              disabled={loading} 
            />
          </div>
          <div className={styles.form__group}>
            <label className={styles.form__label}>Choose a picture: </label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className={styles.choosepicture} 
              required 
              disabled={loading} 
            />
          </div>

          {fileName && (
            <div className={styles.fileName}>
              <p>Selected File: {fileName}</p>
            </div>
          )}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {message && (
          <div className={styles.message}>
            <p>{message}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FindPersonForm;
