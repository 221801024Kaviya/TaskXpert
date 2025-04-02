import { useState } from "react";
import axios from "axios";

const EmailReply = ({ emailId }) => {
  const [reply, setReply] = useState("");

  const handleGenerateReply = async () => {
    try {
      const response = await axios.post("YOUR_BACKEND_API_URL/generate-reply", {
        emailId,
      });
      setReply(response.data.reply);
    } catch (error) {
      console.error("Error generating reply:", error);
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Reply to Email</h2>
      <button onClick={handleGenerateReply} className="bg-green-500 text-white p-2">
        Generate Reply
      </button>
      {reply && (
        <div className="mt-4 p-3 border bg-gray-100">
          <h3 className="font-semibold">Generated Reply:</h3>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
};

export default EmailReply;
