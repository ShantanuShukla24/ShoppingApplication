import { useState } from "react";
import chatIcon from "../assets/chaticon.png"; // Adjust the path if needed

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        "Hello! How can I assist you?"
    ]);
    const [input, setInput] = useState("");

    const handleSendMessage = () => {
        if (input.trim() !== "") {
            setMessages([...messages, input, "Contact +91-1234567890 or send email to support@care.com"]);
            setInput("");
        }
    };

    return (
        <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
            {/* Small Clickable Chat Icon */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "#007bff",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    }}
                >
                    <img
                        src={chatIcon}
                        alt="Chatbot"
                        style={{ width: "30px", height: "30px" }}
                    />
                </button>
            )}

            {isOpen && (
                <div
                    style={{
                        width: "300px",
                        height: "400px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                        display: "flex",
                        flexDirection: "column",
                        position: "absolute",
                        bottom: "60px",
                        right: "0",
                        border: "1px solid #ccc",
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            padding: "10px",
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>Chatbot</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                background: "none",
                                border: "none",
                                color: "white",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                        >
                            ✖
                        </button>
                    </div>

                    {/* Chat Content */}
                    <div
                        style={{
                            flex: 1,
                            padding: "10px",
                            overflowY: "auto",
                            backgroundColor: "#f1f1f1",
                        }}
                    >
                        {messages.map((msg, index) => (
                            <p key={index} style={{ padding: "8px", background: "white", borderRadius: "5px", marginBottom: "5px" }}>
                                {msg}
                            </p>
                        ))}
                    </div>

                    {/* Message Input */}
                    <div
                        style={{
                            padding: "10px",
                            borderTop: "1px solid #ccc",
                            display: "flex",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            style={{
                                flex: 1,
                                padding: "5px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        />
                        <button
                            onClick={handleSendMessage}
                            style={{
                                marginLeft: "5px",
                                padding: "5px 10px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
