import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import './style.css';

const API_KEY = `aed03b231d649f06436e5b70f5c29c87`;

const Home = () => {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShwvfH1GxkMPhguH4cfdQrVjPzW667L3S_Hg&usqp=CAU'
    })

    const [name, setname] = useState('');
    const [error, setError] = useState('');

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&units=metric`;

    // const handleClick = () => {
    //     if (name !== "") {
    //         axios.get(apiUrl)
    //             .then(res => {
    //                 setData({ ...data, celcius: res.main.temp, name: res.main.name })
    //                 console.log(res.data)
    //             })
    //             .catch(err => console.log(err));
    //     }
    // }

    // useEffect(() => {
    //     const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current_weather=true`;
    //         axios.get(apiUrl)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))
    // },[])

    const handleClick = () => {
        // alert("KO");
        if (name === '') {
            alert("Enter city name")
        }
        else {
            // alert("KO");
            // setname('');
            fetch(apiUrl)
                .then(res => res.json())
                .then(res2 => {
                    let imagePath= '';
                    if(res2.weather[0].main == "Clouds"){
                        imagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdFb5yfdl91L4tTXyjIrDtZxqm2Zc9RSrVXg&usqp=CAU"
                    } else if(res2.weather[0].main == "Clear"){
                        imagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShwvfH1GxkMPhguH4cfdQrVjPzW667L3S_Hg&usqp=CAU"
                    } else if(res2.weather[0].main == "Rain"){
                        imagePath = "https://www.clipartmax.com/png/small/24-249261_rainmanweather-heavy-rain-clouds-png.png"
                    } else if(res2.weather[0].main == "Haze"){
                        imagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg8p66yMTDL5okNqBM4UOmtWWrhD7r3g4EO494aCVeKj6_AsEhExhKf4Mh4QR_L8MwcL4&usqp=CAU"
                    } else {
                        imagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShwvfH1GxkMPhguH4cfdQrVjPzW667L3S_Hg&usqp=CAU"
                    }
                    setData({ ...data, celcius: res2.main.temp, name: res2.name, humidity: res2.main.humidity, speed: res2.wind.speed, image: imagePath })
                    setError('');
                    console.log(res2)
                })
                .catch( err => {
                    if(err){
                        setError("Invalid City Name")
                    } else {
                       setError(''); 
                    }
                    console.log(err)});

            setname('');
        }
    }





    return (
        <>
            <div id='main-div'>
                <div id='box'>
                    <div className='inputData'>
                        <input type='search'
                            className='inputField'
                            placeholder='Enter your city name'
                            onChange={e => setname(e.target.value)}
                            value={name} />
                        <button className='logo' onClick={handleClick}><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                    <div className='error'>
                        <p>{error}</p>
                    </div>
                    <div className='info'>
                        <img src={data.image} alt='image' />
                        <h2>{data.name}</h2>
                        <h1>{data.celcius}°C</h1>
                    </div>
                    <div className='info2'>
                        <div>
                            <h2>{data.humidity}%</h2>
                            <h3>Humidity</h3>
                        </div>
                        <div>
                            <h2>{data.speed}km/h</h2>
                            <h3>Wind</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home