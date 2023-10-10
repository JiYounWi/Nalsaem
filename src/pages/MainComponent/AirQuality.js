import React, {useState, useEffect} from "react";
import './Weather.css';
import axios from "axios";
import {TiWeatherSunny} from 'react-icons/ti';
import {RxFace} from 'react-icons/rx';


const today = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  return `${month}월 ${date}일`;
}

function AirQuality() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // 초기값으로 loading을 true로 설정
  const [airQuality, setAirQuality] = useState(null);

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

      if(airQuality === null) {
        return <p>로딩 중...</p>
      }

    return(
        <div className='carousel-container'>
            <div className='carousel-items'>
              {airQuality.guList.map((guData, index) => (
                <div key={index} className='carousel-item'>
                  <div className='carousel-item1'>
                    <p>
                      미세먼지
                      <br/>
                      <RxFace size={40}/>
                      <br/>
                      {guData.pm10Value}㎍/㎥
                    </p>
                    <p>
                      초미세먼지
                      <br/>
                      <RxFace size={40}/>
                      <br />
                      {guData.pm25Value}㎍/㎥
                    </p>
                    <p>
                      오존
                      <br/>
                      <RxFace size={40}/>
                      <br/>
                      {guData.o3Value}ppm
                    </p>
                  </div>
                  <div className='carousel-item2'>
                    <p>이산화황 : {guData.so2Value}ppm</p>
                    <p>일산화탄소 : {guData.coValue}ppm</p>
                    <p>이산화질소 : {guData.no2Value}ppm</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
    )
}

export default AirQuality;