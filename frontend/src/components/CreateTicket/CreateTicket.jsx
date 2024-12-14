import React from 'react'
import styles from './CreateTicket.module.css'
import { Link } from 'react-router-dom'
import FoundPersonForm from '../FindPersonForm/FindPersonForm';

function CreateTicket() {
  return (
    <div className={styles.outer}>
        <div className={styles.card}>
        <h1>Create Ticket</h1>
        <div className={styles.buttonGroup}>
            <Link to="/found-person" className={`${styles.button} ${styles.found}`}>Found a Person</Link>
            <Link to="/lost-person" className={`${styles.button} ${styles.lost}`}>Lost a Person</Link>
            <Link to="/matched-tickets" className={`${styles.button} ${styles.Match}`}>Match Results</Link>
        </div>
        </div>
  </div>
  )
}

export default CreateTicket