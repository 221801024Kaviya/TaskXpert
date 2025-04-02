import { useState } from "react";

const Compose = () => {
    const [emailContent, setEmailContent] = useState("");
    const [generatedEmail, setGeneratedEmail] = useState("");
    const generateEmail = async () => {
        try {
            const response = await fetch("https://1831-34-125-73-246.ngrok-free.app/generate-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ content: "Hello, generate an email!" }) // ✅ Ensure 'content' field is sent
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
            }
    
            const data = await response.json();
            console.log("Generated Email:", data);
        } catch (error) {
            console.error("Error generating email:", error);
        }
    };
    
    
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">AI-Assisted Email Compose</h1>
            
            <textarea
                className="w-full p-2 border rounded mb-4"
                placeholder="Enter key points for the email..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
            />

            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={generateEmail}
            >
                Generate Email
            </button>

            {generatedEmail && (
                <div className="mt-4 p-4 border rounded bg-gray-100">
                    <h2 className="text-lg font-semibold">Generated Email:</h2>
                    <p>{generatedEmail}</p>
                </div>
            )}
        </div>
    );
};

export default Compose;



