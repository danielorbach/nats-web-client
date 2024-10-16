import React from 'react'
import './App.css'
import Publisher from './components/Publisher'
import Subscriber from './components/Subscriber'

function App() {
    return (
        <div className="App">
            <h1>NATS Web Client</h1>
            <Publisher />
            <Subscriber />
        </div>
    )
}

export default App