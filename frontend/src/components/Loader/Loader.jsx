// Loader.js
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './Loader.module.css'; // Import styles from Loader.module.css

const Loader = () => {
  return (
    <div className={styles.loader}> {/* Use styles.loader for className */}
      <CircularProgress />
      {/* You can add more styles or indicators if necessary */}
    </div>
  );
};

export default Loader;
