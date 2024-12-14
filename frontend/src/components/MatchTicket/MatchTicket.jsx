import React from 'react'
// import styles from 'MatchTicket.module.css'
// import image from '../../assets/images/homebg.png'
import MatchCards from './MatchCards';
import Navbar from '../Navbar/Navbar';
function MatchTicket() {
  return (
    <>
    <Navbar/>
    <div className="h-screen w-screen mt-10 mb-10 mr-10 ml-10" >
 
      <MatchCards/>
      {/* <MatchCards/>
      <MatchCards/> */}
    </div>  
    </>
  );
}

export default MatchTicket;