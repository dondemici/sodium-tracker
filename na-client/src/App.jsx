import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import IngredientPage from './page/IngredientPage'
//import LoginButton from "./page/LoginButton";
import LogoutButton from "./page/LogoutButton";
import Profile from "./page/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar"; // Import the Sidebar component


function App() {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  //const { isAuthenticated } = useAuth0();
  //const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect(); // Automatically redirect to Auth0 login
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading) return <div>Loading...</div>;
  
  return (
    <Router>
      <div style={{ display: "flex" }}>
        {isAuthenticated && <Sidebar />} {/* Show Sidebar only when logged in */}
        <div style={{ marginLeft: "220px", padding: "20px" }}> {/* Push content right */}
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/ingredients" element={<IngredientPage />} />
            <Route path="/" element={<Profile />} /> {/* Default to Profile */}
          </Routes>
        </div>
      </div>
    </Router>
  );
  //return (
  //  <div>
  //    <LogoutButton />
  //    <Profile />
  //    {isAuthenticated && <IngredientPage />}
  //  </div>
  //);
  //return (
  //  <div>
  //    {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
  //    <Profile />
  //    {isAuthenticated && <IngredientPage />}
  //  </div>
  //);
  //return (
  //  <>
  //    <IngredientPage />
  //  </>
  //)
}

export default App
