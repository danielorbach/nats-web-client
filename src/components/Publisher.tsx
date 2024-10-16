import React, { useState } from 'react';

const Publisher: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [message, setMessage] = useState('');

    const handlePublish = () => {
        // We'll implement the actual publishing logic later
        console.log(`Publishing to topic: ${topic}, message: ${message}`);
    };

    return (
        <div>
            <h2>Publish Message</h2>
            <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter topic"
            />
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message"
            />
            <button onClick={handlePublish}>Publish</button>
        </div>
    );
};

export default Publisher;