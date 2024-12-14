// // // // import React from 'react';
// // // // import { Link } from 'react-router-dom';
// // // // import styles from './HomePage.module.css';
// // // // import Navbar from "../Navbar/Navbar";
// // // // import Footer from '../Footer/Footer';
// // // // import HomeSection from '../HomeSection/HomeSection';

// // // // const HomePage = () => {
// // // //   return (
// // // //     <>
// // // //       <Navbar /> 

// // // //       <div className={styles.container}>
// // // //         {/* Add your main content here */}
// // // //         <div className={styles.sectionContainer}>
// // // //           <HomeSection />
// // // //         </div>

// // // //         {/* Add additional components here */}
// // // //         {/* <div className={styles.sectionContainer}>
// // // //           <div className={styles.card}>
// // // //             <h1>Additional Component 1</h1>
// // // //             <p>This is some content for the first additional component.</p>
// // // //           </div>
// // // //         </div> */}

// // // //         {/* <div className={styles.sectionContainer}>
// // // //           <div className={styles.card}>
// // // //             <h1>Additional Component 2</h1>
// // // //             <p>This is some content for the second additional component.</p>
// // // //           </div>
// // // //         </div> */}

// // // //         {/* <div className={styles.sectionContainer}>
// // // //           <div className={styles.card}>
// // // //             <h1>Additional Component 3</h1>
// // // //             <p>This is some content for the third additional component.</p>
// // // //           </div>
// // // //         </div> */}
// // // //         {/* <div className={styles.sectionContainer}>
// // // //           <div className={styles.card}>
// // // //              <Footer />
// // // //           </div>
// // // //         </div> */}
// // // //       </div>
// // // //       <div className={styles.Footer}>
// // // //         <Footer/>
// // // //       </div>

     
// // // //     </>
// // // //   );
// // // // };

// // // // export default HomePage;
// // // import React from 'react';
// // // import styles from './HomePage.module.css';
// // // import Navbar from '../Navbar/Navbar';
// // // import Footer from '../Footer/Footer';
// // // import HomeSection from '../HomeSection/HomeSection';

// // // const HomePage = () => {
// // //   return (
// // //     <>
// // //       <Navbar />

// // //       <div className={styles.container}>
// // //         {/* Main content area */}
// // //         <div className={styles.sectionContainer}>
// // //           <HomeSection />
// // //         </div>

// // //         {/* Add additional sections if needed */}
// // //         {/* <div className={styles.sectionContainer}>
// // //           <div className={styles.card}>
// // //             <h1>Additional Component 1</h1>
// // //             <p>This is content for the first additional component.</p>
// // //           </div>
// // //         </div>

// // //         <div className={styles.sectionContainer}>
// // //           <div className={styles.card}>
// // //             <h1>Additional Component 2</h1>
// // //             <p>This is content for the second additional component.</p>
// // //           </div>
// // //         </div>

// // //         <div className={styles.sectionContainer}>
// // //           <div className={styles.card}>
// // //             <h1>Additional Component 3</h1>
// // //             <p>This is content for the third additional component.</p>
// // //           </div>
// // //         </div> */}
     

// // //       {/* Footer section */}
// // //         <div>
// // //           <div className={styles.Footer}>
// // //            <Footer />
// // //           </div>
// // //         </div>
     
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default HomePage;

// // import React, { useRef } from 'react';
// // import styles from './HomePage.module.css';
// // import Navbar from '../Navbar/Navbar';
// // import Footer from '../Footer/Footer';
// // import HomeSection from '../HomeSection/HomeSection';

// // const HomePage = () => {
// //   const footerRef = useRef(null);

// //   // Function to scroll to the footer
// //   const scrollToFooter = () => {
// //     footerRef.current.scrollIntoView({ behavior: 'smooth' });
// //   };

// //   return (
// //     <>
// //       <Navbar onContactClick={scrollToFooter} />  {/* Pass the function as prop */}

// //       <div className={styles.container}>
// //         {/* Main content area */}
// //         <div className={styles.sectionContainer}>
// //           <HomeSection />
// //         </div>

// //         {/* Footer section */}
// //         <div ref={footerRef} className={styles.Footer}>
// //           <Footer />
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default HomePage;

// import React from 'react';
// import styles from './HomePage.module.css';
// import Navbar from '../Navbar/Navbar';
// import Footer from '../Footer/Footer';
// import HomeSection from '../HomeSection/HomeSection';

// const HomePage = () => {
//   return (
//     <>
//       <Navbar /> 

//       <div className={styles.container}>
//         {/* Main content area */}
//         <div className={styles.sectionContainer} id="explore-section">
//           {/* This is where the "Explore Card" will be */}
//           <HomeSection />
//         </div>

//         {/* Footer section with id */}
//         <div id="footer-section" className={styles.Footer}>
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomePage;

import React, { useEffect } from 'react';
import styles from './HomePage.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import HomeSection from '../HomeSection/HomeSection';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();

  // Scroll to specific section when the home page is rendered
  useEffect(() => {
    if (location.hash === "#explore-section") {
      document.getElementById("explore-section").scrollIntoView({ behavior: "smooth" });
    } else if (location.hash === "#footer-section") {
      document.getElementById("footer-section").scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <Navbar /> 

      <div className={styles.container}>
        {/* Main content area */}
        <div className={styles.sectionContainer} id="explore-section">
          <HomeSection />
        </div>

        {/* Footer section with id */}
        <div id="footer-section" className={styles.Footer}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;

