import React, { useState } from 'react';
import Sunny from './weather-icons/Sunny.svg';
import Rain from './weather-icons/Rain.svg';
import Cloudy from './weather-icons/Cloudy.svg';
import Default from './weather-icons/Partly-Cloudy.svg';
import PartlyCloudy from './weather-icons/Partly-Cloudy.svg';
import '../index.css';
import axios from 'axios';
//Weatherapi.com was used to fetch information for this website.

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); 

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


    const getWeather = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
                params: {
                    key: API_KEY,
                    q: city,
                },
            });
            setWeather(response.data);
            setError(null);
        } catch (err) {
            setError('City not found. Please try again.');
            setWeather(null);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // using different custom svgs to show a visual of the weather to the user.
    const getIconPath = (condition) => {
        switch (condition.toLowerCase().replace(/\s+/g, '')) {
            case 'sunny':
                return Sunny;
            case 'rain':
                return Rain;
            case 'partly':
                return PartlyCloudy;
            case 'cloudy':
                return Cloudy;
            default:
                return Default;
        }
    };

    let icon = '';
    if (weather) {
        const status = weather.current.condition.text;
        icon = getIconPath(status);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-10 text-3xl fade-in bg-light-blue font-sans">
            <div className="text-center">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    className="w-96 text-dark-blue rounded text-lg px-4 py-2 transition-transform transform hover:scale-105"
                />
                <button
                    onClick={getWeather}
                    className="ml-4 px-4 py-2 bg-blue text-white rounded transition-transform transform hover:scale-110"
                >
                    Search
                </button>
            </div>

            {loading && (
                <div className="flex items-center justify-center">
                    <div className="spinner border-t-4 border-blue rounded-full w-16 h-16"></div>
                </div>
            )}

            {error && <p className="text-pink">{error}</p>}
            {weather && (
                <div className="text-center space-y-4 slide-up">
                    <h2 className="font-bold text-dark-blue">{weather.location.name}</h2>
                    <p className="font-medium text-dark-blue">{weather.current.temp_c}°C</p>
                    <p className="font-medium text-dark-blue">{weather.current.condition.text}</p>
                </div>
            )}
            {weather && icon && (
                <div>
                    <img src={icon} alt="Weather icon" className="w-[100px] h-[100px] bounce-slow" />
                </div>
            )}
        </div>
    );
};

export default Weather;