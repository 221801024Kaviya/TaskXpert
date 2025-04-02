import { useState } from "react";
import "./ForgotPassword.css"; // Import CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Sending reset link...");

    try {
        const response = await fetch("http://localhost:5000/api/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to send reset link");
        }

        setMessage("✅ Password reset link sent to your email!");
    } catch (error) {
        console.error("Forgot Password Error:", error);
        setMessage("❌ Failed to send reset link. Please try again.");
    }
};

  return (
    <div className="container">
      <div className="form-box">
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a reset link.</p>

        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;


// import { useState } from "react";

// const ForgotPassword = () => {
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage(""); // Clear previous messages

//         try {
//             const response = await fetch("http://localhost:5000/api/forgot-password", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email }),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 setMessage(`✅ ${data.message}`);
//             } else {
//                 setMessage(`❌ ${data.message}`);
//             }
//         } catch (error) {
//             console.error("Forgot Password Error:", error);
//             setMessage("❌ Failed to send reset link. Please try again.");
//         }
//     };

//     return (
//         <div className="forgot-password-container">
//             <h2>Forgot Password</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Send Reset Link</button>
//             </form>
//             {message && <p className="message">{message}</p>}
//         </div>
//     );
// };

// export default ForgotPassword;


// import React, { useState } from "react";
// import axios from "axios";

// const ForgotPassword = () => {
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("http://localhost:5000/api/forgot-password", { email });
//             setMessage(res.data.message);
//         } catch (error) {
//             setMessage("Failed to send reset link. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <h2>Forgot Password</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Send Reset Link</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default ForgotPassword;
