import React from 'react';
import styles from './HomeSection.module.css';
import { Link,  } from 'react-router-dom';
import Footer from '../Footer/Footer';

function HomeSection() {


  return (
    <>
    <div
      className={styles.HomeSection}
    >
      <div className={styles.Card}>
      <h1 style={{ color: 'white' }}>Explore More</h1>
      <p>
      Discover our innovative features and tools designed to 
      enhance your experience and drive success. Dive in to see how our solutions can transform your workflow!
        </p>
        <Link to="/YourList" className={styles.button}>Get Started</Link>
      </div>
     
    </div>
    {/* <div>
        <Footer/>
      </div> */}
   
    </>
  );
}

export default HomeSection;
