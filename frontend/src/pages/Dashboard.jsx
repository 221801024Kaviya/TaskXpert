// import React, { useState, useEffect } from "react";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     // Fetch the user's name from local storage (or API if stored in backend)
//     const storedName = localStorage.getItem("userName") || "User";
//     setUserName(storedName);
//   }, []);

//   return (
//     <div className="dashboard">
//       <div className="profile-container">
//         <div className="profile-icon">
//           {userName.charAt(0).toUpperCase()}
//         </div>
//       </div>
      
//       <div className="chat-container">
//         <h1 className="heading">How can I help with You?</h1>
//         <div className="input-container">
//           <input type="text" className="inp" placeholder="Type here" />
//           <button className="btn">Send</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("221801024@rajalakshmi.edu.in");
  const [message, setMessage] = useState("");
  const [showEmailContainer, setShowEmailContainer] = useState(false);
  
  const [emailDetails, setEmailDetails] = useState({
    from: userEmail,
    to: "",
    subject: "",
    content: "",
  });

  useEffect(() => {
    const storedName = localStorage.getItem("userName") || "User";
    setUserName(storedName);
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;

    setEmailDetails({
      ...emailDetails,
      subject: "Generated Subject from LLM",
      content: "This is an AI-generated email body based on your input.",
    });

    setShowEmailContainer(true);
    setMessage(""); // Clear input field
  };

  const handleEdit = () => {
    setEmailDetails({ from: userEmail, to: "", subject: "", content: "" });
  };

  return (
    <div className="dashboard">
      <div className="profile-container">
        <div className="profile-icon">{userName.charAt(0).toUpperCase()}</div>
      </div>

      {!showEmailContainer && <h1 className="heading">How can I help with you?</h1>}

      {showEmailContainer && (
        <div className="email-container">
          <div className="email-box">
            <div className="field-group">
              <label>From</label>
              <input type="text" value={emailDetails.from} readOnly />
            </div>

            <div className="field-group">
              <label>To</label>
              <input
                type="text"
                placeholder="Enter recipient email"
                value={emailDetails.to}
                onChange={(e) =>
                  setEmailDetails({ ...emailDetails, to: e.target.value })
                }
              />
            </div>

            <div className="field-group">
              <label>Subject</label>
              <input type="text" value={emailDetails.subject} readOnly />
            </div>

            <div className="field-group">
              <label>Message</label>
              <textarea
                className="message-input"
                placeholder="Type here"
                value={emailDetails.content}
                readOnly
              />
            </div>

            <div className="btn-group">
              <button className="edit-btn" onClick={handleEdit}>
                Edit
              </button>
              <button className="send-btn">Send Mail</button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed-input-container">
        <input
          type="text"
          className="inp"
          placeholder="Type here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
