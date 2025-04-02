import React, { useState } from "react";
import axios from "axios";

const Compose = () => {
    const [inputText, setInputText] = useState("");
    const [emailData, setEmailData] = useState(null);

    const generateEmail = async () => {
        try {
            const response = await axios.post("http://localhost:5000/generate-email", { message: inputText });
            setEmailData(response.data);
        } catch (error) {
            console.error("Error generating email:", error);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Type here" value={inputText} onChange={(e) => setInputText(e.target.value)} />
            <button onClick={generateEmail}>Send</button>

            {emailData && (
                <div className="email-container">
                    <label>From:</label> <input type="text" value="your-email@example.com" readOnly />
                    <label>To:</label> <input type="text" placeholder="Recipient email" />
                    <label>Subject:</label> <input type="text" value={emailData.subject} readOnly />
                    <label>Body:</label> <textarea value={emailData.body} readOnly />
                    <button>Edit</button>
                    <button>Send Email</button>
                </div>
            )}
        </div>
    );
};

export default Compose;
