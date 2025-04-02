import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css"; // Import CSS file

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setTimeout(() => navigate("/signin"), 2000);
      }
    } catch (error) {
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Reset Password</h2>
        <p>Enter your new password.</p>

        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;


// import React, { useState } from "react";
// import axios from "axios";
// import { useSearchParams, useNavigate } from "react-router-dom";

// const ResetPassword = () => {
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();
    
//     const token = searchParams.get("token");
//     const email = searchParams.get("email");
    
//     const [newPassword, setNewPassword] = useState("");
//     const [message, setMessage] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("http://localhost:5000/api/reset-password", {
//                 email,
//                 token,
//                 newPassword,
//             });
//             setMessage(res.data.message);
//             setTimeout(() => navigate("/signin"), 2000); // Redirect to login
//         } catch (error) {
//             setMessage("Invalid or expired token.");
//         }
//     };

//     return (
//         <div>
//             <h2>Reset Password</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="password"
//                     placeholder="Enter new password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Reset Password</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default ResetPassword;
