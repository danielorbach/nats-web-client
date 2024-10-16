import React, { useState } from 'react';

const Subscriber: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    const handleSubscribe = () => {
        // We'll implement the actual subscription logic later
        console.log(`Subscribing to topic: ${topic}`);
    };

    return (
        <div>
            <h2>Subscribe to Topic</h2>
            <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter topic to subscribe"
            />
            <button onClick={handleSubscribe}>Subscribe</button>
            <div>
                <h3>Received Messages:</h3>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Subscriber;