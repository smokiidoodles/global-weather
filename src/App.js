import React from 'react';
import Weather from './Components/Weather.js';
import './index.css';

function App() {
    return (
        <div className="App">
            <div className='h-full max-h-80'>
            <Weather/>
            </div>
        </div>
    );
}

export default App;