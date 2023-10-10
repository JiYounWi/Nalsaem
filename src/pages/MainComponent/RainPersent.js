import React, {useState, useEffect} from "react";
import './RainPersent.css';
import axios from "axios";
import {IoWater} from 'react-icons/io5';

const today = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  return `${month}월 ${date}일`;
}


const weekDay2 = () => {
  const now = new Date();

  const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const dayIndex = (now.getDay() + 2) % 7;
  const day = week[dayIndex];

  return `${day}`;
}

const weekDay3 = () => {
  const now = new Date();

  const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const dayIndex = (now.getDay() + 3) % 7; 
  const day = week[dayIndex];

  return `${day}`;
}

function RainPersent() {
    const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true); // 초기값으로 loading을 true로 설정

  const [weather, setWeather] = useState(null);

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

      const weatherInfo = weather.weatherInfoList.find(info => info.category === "습도");

    return(
        <div className="RainPersent">
            <div className="today">
                <p>오늘</p>
                {/* <IoWater size={20} color="white"/> */}
                {weatherInfo && (
                    <p>{weatherInfo.value}%</p>
                )}
                <p>{today()}</p>
            </div>
            <div className="week">
                <p>내일</p>
            </div>
            <div className="week">
              <p>{weekDay2()}</p>

            </div>
            <div className="week">
              <p>{weekDay3()}</p>

            </div>
        </div>
    )
}

export default RainPersent;