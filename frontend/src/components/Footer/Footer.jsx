import React from 'react';
import styles from './Footer.module.css'; // Reference the updated CSS module
import logo from '../../assets/logo.png';
import github from '../../assets/github.png';
import email from "../../assets/email.png";
import phone from '../../assets/phone.png';

const Footer = () => {
  return (
    <div className={styles.footer} id='footer'>
      <div className={styles.footerContent}>
        {/* Left Section */}
        <div className={styles.footerContentLeft}>
          <img className={styles.logo} src={logo} alt="Logo" />
          <h1 style={{ color: 'rgb(0, 79, 176)' }}>About FindMe</h1>
          <p>
          Find-Me is a web application that helps users quickly locate lost or found individuals using advanced image-matching technology. With an easy-to-use interface, it streamlines ticket creation and provides real-time updates, making the search process faster and more efficient.          </p>
        </div>

        {/* Center Section - Add content here if needed */}
        <div className={styles.footerContentCenter}>
          {/* Empty for now - you can add navigation or links here */}
        </div>

        {/* Right Section */}
        <div className={styles.footerContentRight}>
          <h2>GET IN TOUCH</h2>
          <div className={styles.con}>
            <img src={github} alt="GitHub" />
            <span>rishigaware</span>
          </div>
          <div className={styles.con}>
            <img src={email} alt="Email" />
            <span>gawarerishi@gmail.com</span>
          </div>
          <div className={styles.con}>
            <img src={phone} alt="Phone" />
            <span>9662631201/7780271375</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
