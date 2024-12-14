import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include', // Ensures that cookies (e.g., JWT) are sent
      });

      if (response.ok) {
        // If the logout is successful, redirect to login page
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return (
    <div className={styles.dashboardContainer }>
      {/* Sidebar Navigation */}
      <nav className={styles.sidebar}>
        <h2 className={styles.logo}>MyApp</h2>
        <ul className={styles.navList}>
          <li><Link to="/dashboard" className={styles.navItem}>Dashboard</Link></li>
          <li><Link to="/profile" className={styles.navItem}>Profile</Link></li>
          <li><Link to="/settings" className={styles.navItem}>Settings</Link></li>
          {/* Trigger handleLogout when clicking the logout button */}
          <li><button onClick={handleLogout} className={styles.navItem}>Logout</button></li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <h1>Dashboard</h1>
        </header>

        {/* Dashboard Content */}
        <div className={styles.content}>
          <section className={styles.section}>
            <h2>Overview</h2>
            <p>Welcome to the dashboard! Here you can manage your account, view statistics, and access various settings.</p>
          </section>

          <section className={styles.section}>
            <h2>Recent Activity</h2>
            <p>Here you can see your most recent activities and updates.</p>
            <ul>
              <li>Logged in at 9:00 AM</li>
              <li>Updated profile at 9:15 AM</li>
              <li>Changed password at 9:30 AM</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
