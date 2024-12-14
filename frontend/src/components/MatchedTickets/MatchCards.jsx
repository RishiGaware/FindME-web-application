import React from 'react';
import styles from './MatchCards.module.css';
import PropTypes from 'prop-types';

function MatchCards({ foundMatch, lostMatch }) {
    const baseUrl = "http://localhost:3000"; // Set your backend URL here

    return (
        <div className={styles.container}>
            {/* Found Match Card */}
            <div className="flex flex-col items-center justify-center">
                <div className={styles.card}>
                    <img
                        src={foundMatch.picture ? `${baseUrl}${foundMatch.picture}` : 'default-image-url.jpg'}
                        alt="Found Match"
                        className={styles.cardImage}
                    />
                    <div className={styles.textContainer}>
                        <span className={styles.badge}>{foundMatch.name}</span>
                        <p className={styles.infoText}>Age: {foundMatch.age}</p>
                        <p className={styles.infoText}>City: {foundMatch.city}</p>
                        <p className={styles.infoText}>State: {foundMatch.state}</p>
                        <p className={styles.infoText}>Contact Number: {foundMatch.phone}</p>
                    </div>
                </div>
            </div>

            <button className={styles.button}>Matched</button>

            {/* Lost Match Card */}
            <div className="flex flex-col items-center justify-center">
                <div className={styles.card}>
                    <img
                        src={lostMatch.picture ? `${baseUrl}${lostMatch.picture}` : 'default-image-url.jpg'}
                        alt="Lost Match"
                        className={styles.cardImage}
                    />
                    <div className={styles.textContainer}>
                        <span className={styles.badge}>{lostMatch.name}</span>
                        <p className={styles.infoText}>Age: {lostMatch.age}</p>
                        <p className={styles.infoText}>City: {lostMatch.city}</p>
                        <p className={styles.infoText}>State: {lostMatch.state}</p>
                        <p className={styles.infoText}>Contact Number: {lostMatch.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Define prop types for the component
MatchCards.propTypes = {
    foundMatch: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    }).isRequired,
    lostMatch: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    }).isRequired,
};

export default MatchCards;
