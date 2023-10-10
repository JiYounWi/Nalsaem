import React, {useState, useEffect} from "react";
import './WeekToWeather.css';
import axios from "axios";
import {TiWeatherSunny} from 'react-icons/ti';

const today = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  return `${month}월 ${date}일`;
}

function WeekToWeather() {
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true); // 초기값으로 loading을 true로 설정


    useEffect(() => {
        // 브라우저의 Geolocation API를 사용하여 사용자의 위치 정보를 가져옵니다.
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
        } else{
          setError('Geolocation API를 지원하지 않는 브라우저입니다.');
        }
      }, []);

      const [latitude, setLatitude] = useState(null);
      const [longitude, setLongitude] = useState(null);
  

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

      if(weather === null) {
        return <p>로딩 중...</p>
      }

      const weatherInfo = weather.weatherInfoList.find(info => info.category === "기온");
      
    
    return(
        <div className="WeekToWeather">
            <div className="today">
                <p>오늘</p>

                {weatherInfo && (
                  <p>{weatherInfo.value}°C</p>
                )}

                <p>{today()}</p>
            </div>
            <div className="week">
                <p>내일</p>
            </div>
            <div className="week">
              <p>모레</p>

            </div>
        </div>
    )
}

export default WeekToWeather;