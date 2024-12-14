import React from 'react';
import Navbar from '../Navbar/Navbar';
import styles from './Tutorial.module.css';
import explore from '../images/explore.png.jpg';
import createticket from '../images/create-ticket-png.jpg';
import found from '../images/found-png.jpg';
import lost from '../images/lost.png.jpg';
import openticketfound from '../images/open-f.jpg';
import openticketlost from '../images/open-l.jpg';
import closedticketfound from '../images/closed-ticket-found.png.jpg';
import closedticketlost from '../images/close-l.png';

function Tutorial() {
  return (
    <>
      <Navbar />
        <div className={styles.Card}>
          <h1 className={styles.textbold}>What is Find-Me?</h1>
          <p className={styles.textsmall}>
            Introducing our revolutionary web application equipped with state-of-the-art technology that brings a new level of efficiency and accuracy to locating individuals. By simply uploading a photo of the person in question, our application swiftly scans and cross-references the image against an extensive database. This cutting-edge approach expedites the search process, eliminating the need for cumbersome manual searches and dramatically increasing the chances of locating the individual.
          </p>
          <h1 className={styles.textbold}>Guide to use Find-Me</h1>

          <div className={styles.cardstyle}>
            <p className={styles.textsmall}>
              1) As soon as you log in to our website, you are redirected to the home page. In the home page, there is a button called "Get Started". Click it to proceed further.
            </p>
            <img className={styles.img} src={explore} alt='Explore' />
          </div>

          <div className={styles.cardstyle}>
            <p className={styles.textsmall}>
              2) You are redirected to a page called Your List, where at the top you can find a create-ticket card.
            </p>
            <img className={styles.img} src={createticket} alt='Create Ticket' />
          </div>

          <div className={styles.cardstyle}>
            <p className={styles.textsmall}>
              3) The create-ticket card contains options called Found-a-Person and Lost-a-Person. You can click on either of them as per your request.
            </p>
            <div>
              <img className={styles.img} src={found} alt='Found' />
              <img className={styles.img} src={lost} alt='Lost' />
            </div>
          </div>

          <div className={styles.cardstyle}>
            <p className={styles.textsmall}>
              4) When you click on Found-a-Person, you are redirected to the FoundPersonForm where you need to fill in the details of a found person and click submit.
            </p>
            <img className={styles.img} src={found} alt='Found Form' />
          </div>

          <div className={styles.cardstyle}>
            <p className={styles.textsmall}>
              5) As soon as you click submit, the form redirects you to Your List Page. You can notice that at the bottom of the create-ticket section, there is an open-ticket section where you can find the details of the person whose ticket is filed.
            </p>
            <img className={styles.img} src={openticketfound} alt='Open Ticket Found' />
          </div>

          <div className={styles.cardstyle}>
            <p className={styles.textsmall}>
              6) The same applies to the LostPerson Form as well. After being redirected to Your List, you can check the filed ticket in the opened ticket section.
            </p>
            <img className={styles.img} src={openticketlost} alt='Open Ticket Lost' />
          </div>

          <div className={styles.cardstyle}>
            <p className={styles.textsmall}>
              7) After filling in the details, you can go to the create-ticket section where there is a button called "Match the Ticket". Click on it to check whether your case is solved or not.
            </p>
            <img className={styles.img} src={createticket} alt='Create Ticket' />
          </div>

          <div className={styles.cardstyle}>
            <p className={styles.textsmall}>
              8) When the case is solved, you can see the information of the person's case solved in the closed-ticket section.
            </p>
            <div>
              <img className={styles.img} src={closedticketfound} alt='Closed Ticket Found' />
              <img className={styles.img} src={closedticketlost} alt='Closed Ticket Lost' />
            </div>
          </div>

        </div>
    </>
  );
}

export default Tutorial;
