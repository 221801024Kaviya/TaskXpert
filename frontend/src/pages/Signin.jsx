import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase"; // Import Firebase configuration
import "../styles/signin.css"; // Import CSS

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State for success/error message
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // Handle manual sign-in
//   const handleSignin = () => {
//     // Email validation regex (basic check)
//     const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

//     if (!isValidEmail(email)) {
//       setMessage("❌ Invalid email format!");
//       return;
//     }

//     if (password.length < 6) {
//       setMessage("❌ Password must be at least 6 characters long!");
//       return;
//     }

//     // Simulating successful sign-in
//     console.log("Sign-in Successful!", { email, password });
//     setMessage("✅ Sign-in Successful!");

//     // Redirect to Dashboard after 2 seconds
//     setTimeout(() => navigate("/dashboard"), 2000);
//   };


const handleSignin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!email || !password) {
        setMessage("❌ Email and password are required!");
        return;
    }

    setMessage("⏳ Signing in...");

    try {
        const response = await fetch("http://localhost:5000/api/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Sign-in failed");
        }

        // ✅ Successful Sign-in
        setMessage("✅ Sign-in Successful! Redirecting...");
        localStorage.setItem("token", data.token); // Store JWT Token
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user details
        setTimeout(() => navigate("/dashboard"), 2000); // Redirect to dashboard

    } catch (error) {
        console.error("Sign-in error:", error.message);
        setMessage("❌ Invalid email or password!"); // Show error message for incorrect credentials
    }
};


  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In Successful:", result.user);
      navigate("/dashboard"); 
    } catch (error) {
      setMessage("Google Sign-In Failed: " + error.message);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Navigate to forgot password page
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        {message && <p className="message">{message}</p>} {/* Display success/error message */}
        <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
        <p className="forgot-password" onClick={handleForgotPassword}>Forgot password?</p>
        <button className="signin-btn" onClick={handleSignin}>Sign In</button>
        
        <p className="signup-text">
          Don't have an account? <span className="signup-link" onClick={() => navigate("/signup")}>Sign Up</span>
        </p>

        <button className="google-btn" onClick={handleGoogleSignIn}>
          <img src="https://img.icons8.com/color/20/000000/google-logo.png" alt="Google Logo" />
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default Signin;
