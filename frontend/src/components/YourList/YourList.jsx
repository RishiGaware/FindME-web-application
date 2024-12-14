import  { useEffect, useState } from 'react';
import styles from './YourList.module.css';
import Navbar from "../Navbar/Navbar";
import CreateTicket from '../CreateTicket/CreateTicket';
import Slider from '../Slider/Slider';
import { useUser } from '../../context/UserContext'; 
// import data from '../Slider/data'; // Correct for default export

function YourList() {
  const { user } = useUser(); // Assuming user has a userId property
  const userId = user?.userId; // Using optional chaining to prevent errors

  const [openTicketFoundList, setOpenTicketFoundList] = useState([]);
  const [openTicketLostList, setOpenTicketLostList] = useState([]);
  const [closedTicketFoundList, setClosedTicketFoundList] = useState([]);
  const [closedTicketLostList, setClosedTicketLostList] = useState([]);

  // Function to fetch open tickets for found persons
  const fetchOpenTicketFoundList = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:3000/user/foundlist-openticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error('Failed to fetch open found tickets');
      const data = await response.json();
      setOpenTicketFoundList(data);
      // console.log('Open Found Tickets:', data); // Log fetched data
    } catch (error) {
      console.error('Error fetching open found tickets:', error);
    }
  };

  // Function to fetch open tickets for lost persons
  const fetchOpenTicketLostList = async () => {
    if (!userId) return;
  

    try {
      const response = await fetch(`http://localhost:3000/user/lostlist-openticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error('Failed to fetch open lost tickets');
      const data = await response.json();
      setOpenTicketLostList(data);
      // console.log('Open Lost Tickets:', data); // Log fetched data
    } catch (error) {
      console.error('Error fetching open lost tickets:', error);
    }
  };

  // Function to fetch closed tickets for found persons
  const fetchClosedTicketFoundList = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:3000/user/foundlist-closedticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error('Failed to fetch closed found tickets');
      const data = await response.json();
      setClosedTicketFoundList(data);
      // console.log('Closed Found Tickets:', data); // Log fetched data
    } catch (error) {
      console.error('Error fetching closed found tickets:', error);
    }
  };

  // Function to fetch closed tickets for lost persons
  const fetchClosedTicketLostList = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:3000/user/lostlist-closedticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error('Failed to fetch closed lost tickets');
      const data = await response.json();
      setClosedTicketLostList(data);
      // console.log('Closed Lost Tickets:', data); // Log fetched data
    } catch (error) {
      console.error('Error fetching closed lost tickets:', error);
    }
  };

  // Function to close a ticket
  const handleCloseTicket = async (ticketId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/ticket-status-closed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketId, userId }),
      });

      if (!response.ok) throw new Error('Failed to close ticket');
      
      // After closing the ticket, refetch the open and closed tickets
      fetchOpenTicketFoundList();
      fetchOpenTicketLostList();
      fetchClosedTicketFoundList();
      fetchClosedTicketLostList();
    } catch (error) {
      console.error('Error closing the ticket:', error);
    }
  };


  // useEffect to call all fetch functions
  useEffect(() => {
    fetchOpenTicketFoundList();
    fetchOpenTicketLostList();
    fetchClosedTicketFoundList();
    fetchClosedTicketLostList();
  }, [userId]); // Dependency on userId

  // console.log(closedTicketLostList.length,closedTicketFoundList.length,openTicketLostList.length,openTicketFoundList.length)

  return (
    <>
      <Navbar />
      <div className={styles.Container}>
        <div className={styles.CreateTicketContainer}>
          <CreateTicket />
        </div>
        <div className={styles.sliderContainer}>
        
        <h1 className={styles.one}>Opened Tickets:</h1>

        {/* Check if both Open Found and Open Lost Tickets are empty */}
        {openTicketFoundList.length === 0 && openTicketLostList.length === 0 ? (
          <h2 style={{ color: 'black' ,fontSize:"25px" ,padding:"80px" ,textAlign:"center"}}>No Opened Tickets</h2>
        ) : (
          <>
            {/* Open Found Tickets */}
            <div>
              <h2 className={styles.subfont}>Found-List</h2>
              {openTicketFoundList.length > 0 ? (
                <Slider data={openTicketFoundList} onCloseTicket={handleCloseTicket} />
              ) : (
                <h4 style={{ color: 'black' , padding: '20px 0 20px 100px'}}>No Open Found Tickets</h4>
              )}
            </div>

            {/* Open Lost Tickets */}
            <div>
              <h2 className={styles.subfont}>Lost-List</h2>
              {openTicketLostList.length > 0 ? (
                <Slider data={openTicketLostList} onCloseTicket={handleCloseTicket} />
              ) : (
                <h4 style={{ color: 'black', padding: '20px 0 20px 100px' }}>No Open Lost Tickets</h4>
              )}
            </div>
          </>
        )}

        <h1 className={styles.one}>Closed Tickets:</h1>

        {/* Check if both Closed Found and Closed Lost Tickets are empty */}
        {closedTicketFoundList.length === 0 && closedTicketLostList.length === 0 ? (
          <h2 style={{ color: 'black' ,fontSize:"25px" ,padding:"80px" ,textAlign:"center"}}>No Closed Tickets</h2>
        ) : (
          <>
            {/* Closed Found Tickets */}
            <div>
              <h2 className={styles.subfont}>Found-List</h2>
              {closedTicketFoundList.length > 0 ? (
                <Slider data={closedTicketFoundList} />
              ) : (
                <h4 style={{ color: 'black' , padding: '20px 0 20px 100px' }}>No Closed Found Tickets</h4>
              )}
            </div>

            {/* Closed Lost Tickets */}
            <div>
              <h2 className={styles.subfont}>Lost-List</h2>
              {closedTicketLostList.length > 0 ? (
                <Slider data={closedTicketLostList} />
              ) : (
                <h4 style={{ color: 'black', padding: '20px 0 20px 100px' }}>No Closed Lost Tickets</h4>
              )}
            </div>
          </>
        )}
      </div>

      </div>
    </>
  );
}  
export default YourList;