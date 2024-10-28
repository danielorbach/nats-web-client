import React, { useState } from 'react';
import natsClient from '../natsClient';

const Publisher: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handlePublish = async () => {
        if (!topic || !message) {
            setStatus('Please enter both topic and message.');
            return;
        }

        try {
            await natsClient.publish(topic, message);
            setStatus(`Published to topic: ${topic}`);
            setMessage(''); // Clear the message input after successful publish
        } catch (err) {
            setStatus(`Error publishing message: ${err}`);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Publish Message</h2>
            <div className="mb-4">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter topic"
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
        <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
            className="w-full p-2 border rounded"
            rows={4}
        />
            </div>
            <button
                onClick={handlePublish}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Publish
            </button>
            {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
        </div>
    );
};

export default Publisher;
