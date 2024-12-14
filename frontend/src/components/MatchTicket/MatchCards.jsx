import React from 'react';
import image from '../../assets/images/homebg.png';
import styles from './MatchCards.module.css'; // Import the CSS module

function MatchCards() {
    const baseUrl = "http://localhost:3000"; // Set your backend URL here

  return (
    <>
    <div className={styles.container}>
      {/* Card 1 */}
      <div className="flex flex-col items-center justify-center">
        <div className={styles.card}>
          <img
            src={`https://upload.wikimedia.org/wikipedia/commons/3/3c/Tom_Holland_by_Gage_Skidmore.jpg`}
            alt="image"
            className={styles.cardImage}
          />
          <div className={styles.textContainer}>
            <span className={styles.badge}>name</span>
            <p className={styles.infoText}>Age: 10</p>
            <p className={styles.infoText}>City: kach</p>
            <p className={styles.infoText}>State: gujrat</p>
            <p className={styles.infoText}>Contact Number: 984863012</p>
          </div>
        </div>
      </div>

      <button className={styles.button}>Matched</button>

      {/* Card 2 */}
      <div className="flex flex-col items-center justify-center">
        <div className={styles.card}>
          <img
            src={`https://variety.com/wp-content/uploads/2023/06/GettyImages-1495234870.jpg?w=681&h=454&crop=1`}
            alt="image"
            className={styles.cardImage}
          />
          <div className={styles.textContainer}>
            <span className={styles.badge}>name</span>
            <p className={styles.infoText}>Age: 10</p>
            <p className={styles.infoText}>City: kach</p>
            <p className={styles.infoText}>State: gujrat</p>
            <p className={styles.infoText}>Contact Number: 984863012</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default MatchCards;
