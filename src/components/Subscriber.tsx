import React, { useState, useEffect } from 'react';
import natsClient from '../natsClient';

const Subscriber: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [status, setStatus] = useState('');

    useEffect(() => {
        let unsubscribe: (() => void) | null = null;

        const subscribe = async () => {
            if (isSubscribed && topic) {
                try {
                    unsubscribe = await natsClient.subscribe(topic, (message) => {
                        setMessages((prevMessages) => [...prevMessages, message]);
                    });
                    setStatus(`Subscribed to topic: ${topic}`);
                } catch (err) {
                    setStatus(`Error subscribing to topic: ${err}`);
                    setIsSubscribed(false);
                }
            }
        };

        subscribe();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [topic, isSubscribed]);

    const handleSubscribe = () => {
        if (!topic) {
            setStatus('Please enter a topic to subscribe.');
            return;
        }
        setIsSubscribed(true);
    };

    const handleUnsubscribe = () => {
        setIsSubscribed(false);
        setMessages([]);
        setStatus('Unsubscribed from topic');
    };

    return (
        <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Subscribe to Topic</h2>
            <div className="mb-4">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter topic to subscribe"
                    className="w-full p-2 border rounded"
                    disabled={isSubscribed}
                />
            </div>
            {!isSubscribed ? (
                <button
                    onClick={handleSubscribe}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Subscribe
                </button>
            ) : (
                <button
                    onClick={handleUnsubscribe}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Unsubscribe
                </button>
            )}
            {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
            <div className="mt-4">
                <h3 className="font-bold mb-2">Received Messages:</h3>
                <ul className="list-disc pl-5">
                    {messages.map((msg, index) => (
                        <li key={index} className="mb-1">{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Subscriber;
