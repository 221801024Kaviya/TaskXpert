import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://bd3f-34-16-139-212.ngrok-free.app/generate"; // Replace with your ngrok URL

function GenerateEmail() {
    const [email, setEmail] = useState("");

    async function generateEmail() {
        try {
            const response = await axios.post(API_URL, {
                prompt: "Write an email about a meeting."
            }, {
                headers: { "Content-Type": "application/json" }
            });

            setEmail(response.data.generated_text);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div>
            <button onClick={generateEmail}>Generate Email</button>
            <p>{email}</p>
        </div>
    );
}

export default GenerateEmail;
