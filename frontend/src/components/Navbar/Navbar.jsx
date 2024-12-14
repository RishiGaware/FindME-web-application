import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css"; 
import logo from '../../assets/logo.png';
import { useUser } from '../../context/UserContext';


const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  const { setUser } = useUser(); // Get setUser from context

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/") {
      setMenu("home");
    } else if (currentPath === "/tutorial") {
      setMenu("tutorial");
    } else if (currentPath === "/YourList") {
      setMenu("YourList");
    }
  }, [location.pathname]);

 


  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // Clear user state
    localStorage.removeItem('user'); // Remove user from localStorage
    navigate('/logout');
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      document.getElementById("home").scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
    }
    setMenu("home");
  };

  // Function to handle "Contact Us" click
  const handleContactUsClick = () => {
    if (location.pathname !== "/") {
      // Navigate to the home page first
      navigate("/");
    }
    // Scroll to the footer section
    setTimeout(() => {
      document.getElementById("footer-section").scrollIntoView({ behavior: "smooth" });
    }, 100); // Add a slight delay to ensure navigation completes
    setMenu("contact-us");
  };

  return (
    <div className={styles.navbar}>
      <Link to="/">
        <img src={logo} alt="Logo" className={styles.logo} />
      </Link>
      <ul className={styles.navbarMenu}>
        <a
          onClick={handleHomeClick}
          className={menu === "home" ? styles.active : ""}
        >
          Home
        </a>
        <Link
          to="/tutorial"
          onClick={() => setMenu("tutorial")}
          className={menu === "tutorial" ? styles.active : ""}
        >
          Tutorial
        </Link>
        <Link
          to="/YourList"
          onClick={() => setMenu("YourList")}
          className={menu === "YourList" ? styles.active : ""}
        >
          YourList
        </Link>
        <a
          onClick={handleContactUsClick}
          className={menu === "contact-us" ? styles.active : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className={styles.navbarRight}>
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
