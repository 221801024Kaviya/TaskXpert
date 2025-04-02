// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
// import "../styles/signup.css"; // Import CSS
// import { app } from "../firebase"; // Ensure Firebase is initialized

// const Signup = () => {
//   const navigate = useNavigate();
//   const auth = getAuth(app);
//   const provider = new GoogleAuthProvider();

//   // State for form inputs
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   // Handle Google Sign-In
//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       console.log("Google Sign-In Successful:", result.user);
//       navigate("/dashboard"); // Redirect after successful sign-in
//     } catch (error) {
//       console.error("Google Sign-In Error:", error.code, error.message);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-box">
//         <h2>Sign Up</h2>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           className="input-field"
//           value={userData.name}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="input-field"
//           value={userData.email}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="input-field"
//           value={userData.password}
//           onChange={handleChange}
//         />
//         <button className="signup-btn">Sign Up</button>
        
//         <p className="signin-text">
//           Already have an account?{" "}
//           <span className="signin-link" onClick={() => navigate("/signin")}>
//             Sign In
//           </span>
//         </p>

//         <button className="google-btn" onClick={handleGoogleSignIn}>
//           <img src="https://img.icons8.com/color/20/000000/google-logo.png" alt="Google Logo" />
//           Sign Up with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase"; // Import Firebase configuration
import "../styles/signup.css"; // Import CSS

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(""); // State for success message
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

//   Handle manual signup
const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Email validation regex (basic check)
    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    // Password must be at least 6 characters and contain a number
    const isValidPassword = (password) => password.length >= 6 && /\d/.test(password);

    if (!isValidEmail(email)) {
        setMessage("❌ Invalid email format!");
        return;
    }

    if (!isValidPassword(password)) {
        setMessage("❌ Password must be at least 6 characters & contain a number!");
        return;
    }

    setMessage("⏳ Signing up..."); // Show loading message

    try {
        const response = await fetch("http://localhost:5000/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Signup failed");
        }

        setMessage("✅ Signup Successful! Redirecting...");
        setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
        console.error("Signup error:", error.message);
        setMessage(`❌ ${error.message}`);
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

// const handleSignup = async () => {
//     const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
//     const isValidPassword = (password) => password.length >= 6 && /\d/.test(password);
  
//     if (!isValidEmail(email)) return setMessage("❌ Invalid email format!");
//     if (!isValidPassword(password)) return setMessage("❌ Password must be at least 6 characters & contain a number!");
  
//     try {
//       const response = await fetch("http://localhost:5000/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password, provider: "manual" })
//       });
      
//       const data = await response.json();
//       if (response.ok) {
//         setMessage("✅ Signup Successful!");
//         setTimeout(() => navigate("/signin"), 2000);
//       } else {
//         setMessage(`❌ ${data.message}`);
//       }
//     } catch (error) {
//       setMessage("❌ Signup Failed!");
//     }
//   };
  
//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
  
//       await fetch("http://localhost:5000/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: user.displayName, email: user.email, provider: "google" })
//       });
  
//       navigate("/dashboard");
//     } catch (error) {
//       setMessage("Google Sign-In Failed: " + error.message);
//     }
//   };
  

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        {message && <p className="message">{message}</p>} {/* Display success/error message */}
        <input type="text" placeholder="Name" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="signup-btn" onClick={handleSignup}>Sign Up</button>
        
        <p className="signin-text">
          Already have an account?{" "}
          <span className="signin-link" onClick={() => navigate("/signin")}>
            Sign In
          </span>
        </p>

        <button className="google-btn" onClick={handleGoogleSignIn}>
          <img src="https://img.icons8.com/color/20/000000/google-logo.png" alt="Google Logo" />
          Sign Up with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
