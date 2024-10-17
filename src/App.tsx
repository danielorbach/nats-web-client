import { useEffect, useState } from 'react'
import './App.css'
import Publisher from './components/Publisher'
import Subscriber from './components/Subscriber'
import natsClient from './natsClient'

function App() {
    const [connectionStatus, setConnectionStatus] = useState('Connecting...');

    useEffect(() => {
        const connectToNats = async () => {
            try {
                await natsClient.connect();
                setConnectionStatus('Connected to NATS');
            } catch (err) {
                setConnectionStatus(`Failed to connect to NATS: ${err}`);
            }
        };

        connectToNats();
    }, []);

    return (
        <div className="App p-4">
            <h1 className="text-2xl font-bold mb-4">NATS Web Client</h1>
            <p className="mb-4">{connectionStatus}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Publisher />
                <Subscriber />
            </div>
        </div>
    )
}

export default App