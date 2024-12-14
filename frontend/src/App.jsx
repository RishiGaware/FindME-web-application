import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import HomePage from './components/HomePage/HomePage'; 
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import FindPersonForm from './components/FindPersonForm/FindPersonForm';
import LostPersonForm from './components/LostPersomForm/LostPersonForm';
import YourList from './components/YourList/YourList';
import Tutorial from './components/Tutorial/Tutorial'
import Footer from './components/Footer/Footer';

import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; 
import AuthRedirect from './components/AuthRedirect/AuthRedirect';
import MatchTicket from './components/MatchTicket/MatchTicket';
import MatchedTicket from './components/MatchedTickets/MatchedTickets'

function App() {
  
  return (
    <UserProvider>
      <Router>
      <Routes>

          {/* Public Routes */}
          <Route 
            path="/signup" 
            element={
              <AuthRedirect>
                <Signup />
              </AuthRedirect>
            } 
          />
          <Route 
            path="/login" 
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            } 
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tutorial"
            element={
              <ProtectedRoute>
                <Tutorial/>
              </ProtectedRoute>
            }
          />


          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tutorial"
            element={
              <ProtectedRoute>
                <div>Tutorial Page</div>
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/contact-us"
            element={
              // <ProtectedRoute>
                <div>Contact Us Page</div>
              // </ProtectedRoute>
            }
          /> */}

          <Route
            path="/YourList"
            element={
              <ProtectedRoute>
                <YourList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/found-person"
            element={
              <ProtectedRoute>
                <FindPersonForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lost-person"
            element={
              <ProtectedRoute>
                <LostPersonForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/matched-tickets"
            element={
              <ProtectedRoute>
                < MatchedTicket/>
              </ProtectedRoute>
            }
          />



        </Routes>
        {/* <Footer/> */}
      </Router>
    </UserProvider>
  );
}

export default App;
// dummy change
