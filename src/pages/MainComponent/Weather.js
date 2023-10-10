import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css';
import WeekToWeather from './WeekToWeather';
import RainPersent from './RainPersent';
import sun from '../../image/sun.png';
import AirQuality from './AirQuality';


const today = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  return `${month}월 ${date}일`;
}

const year = () => {
  const now = new Date();
  const year = now.getFullYear();

  return `${year}년`;
}

function Weather() {
  const [loading, setLoading] = useState(true); // 초기값으로 loading을 true로 설정
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error);
          setError('위치 정보를 가져올 수 없습니다.');
        }
      );
    } else {
      setError('Geolocation API를 지원하지 않는 브라우저입니다.');
    }
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) { // 위치 정보가 유효한 경우에만 API 요청
      const SERVER_URL = `https://udega.net:8080/weather?latitude=${latitude}&longitude=${longitude}`;

      axios.get(SERVER_URL)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error(error);
          setError('날씨 정보를 가져오는 중에 오류가 발생했습니다.');
        })
        .finally(() => {
          setLoading(false); // API 요청 완료 후 loading 값을 false로 변경
        });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (latitude !== null && longitude !== null) { // 위치 정보가 유효한 경우에만 API 요청
      const SERVER_URL = `https://udega.net:8080/air?latitude=${latitude}&longitude=${longitude}`;

      axios.get(SERVER_URL)
        .then((response) => {
          setAirQuality(response.data);
        })
        .catch((error) => {
          console.error(error);
          setError('대기질 정보를 가져오는 중에 오류가 발생했습니다.');
        });
    }
  }, [latitude, longitude]);
  
  return( 
    <div className="weather">
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>{error}</p>
    ) : airQuality && weather && (
      <>
           <div className='weather-header'>

            <div className='weather-header-left'>
              <div className='today-weather-header'>{today()}</div>
              <div className='year-weather-header'>{year()}</div>
            </div>
            
            <div className='weather-header-right'>
            <img src={sun} alt="sun" className="sun"/>
              <div className='weather-data'>
                {/* 위치 */}
                <p style={{fontSize:'25px', color:'white', marginTop : '-10px', marginLeft : '-20px'}}>{weather.sido} {weather.gu}</p>

                <p style={{fontSize:'70px', fontWeight:'bold', color:'white', marginTop : '-30px'}}>
                  {weather.weatherInfoList.find(info => info.category === "기온").value}°C
                </p>
                
              </div>
            </div>
          </div>
          <WeekToWeather/>
          {/* <AirQuality/> */}
        </>
    )}
      {/* <div className='WeekToWeather'>
         
       </div> */}
        <AirQuality/>
       {/* <div className='RainPersent'>
         <RainPersent/>
       </div> */}
     </div>
  )
}

export default Weather;