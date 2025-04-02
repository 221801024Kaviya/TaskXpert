import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"; // Import the CSS file

const Home = () => {
  const navigate = useNavigate(); 

  return (
    <div className="container">
      {/* Left Section */}
      <div className="left-section">
        <h1>TaskXpert</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, but also the leap into electronic typesetting, 
          remaining essentially unchanged.
        </p>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="button-container">
        <button className="button" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
          <button className="button" onClick={() => navigate("/signin")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
