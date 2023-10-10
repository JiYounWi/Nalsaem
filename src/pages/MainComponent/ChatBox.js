import React, { useState, useEffect } from 'react';
import './ChatBox.css';

const WeatherChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [error, setError] = useState(null);
  const [chatState, setChatState] = useState('greeting');

  //날씨 API
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError('위치 정보를 가져올 수 없습니다.');
        }
      );
    } else {
      setError('Geolocation API를 지원하지 않는 브라우저입니다.');
    }
  }, []);

    useEffect(()=>{
      if(location){
        const apiKey = '995efd007deb3a4aeb205c694224aadc';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&lang=kr&units=metric`;
        
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          console.error('API 호출 에러:', error);
        });
      }
    },[location]);

    useEffect(() => {
      if (chatState === 'greeting') {
        setChatLog([
          ...chatLog,
          { text: '오늘은 어떤 것을 도와드릴까요?', type: 'bot' },
          { text: '오늘 날씨', type: 'button' },
          { text: '내일 날씨', type: 'button' },
          { text: '주말 날씨', type: 'button' },
        ]);
        setChatState('active');
      }
    }, [chatState, chatLog]);

  const handleUserInput = () => {
    if (userInput.trim() !== '') {
      setChatLog([...chatLog, { text: userInput, type: 'user' }]);
      handleBotResponse(userInput);
      setUserInput('');
    }
  };

  const handleButtonClick = (buttonText) => {
    setChatLog([...chatLog, { text: buttonText, type: 'user' }]);
    handleBotResponse(buttonText);
  };

  const generateWeatherResponse = (input) => {
    const lowerInput = input.toLowerCase();
    let response = '';
  
    if (lowerInput.includes('오늘') && lowerInput.includes('날씨')) {
      response = `현재 날씨는 ${weatherData.weather[0].description}이에요. 기온은 ${weatherData.main.temp}°C입니다.`;
    } else if (lowerInput.includes('내일') && lowerInput.includes('날씨')) {
      response = `아직 데이터가 없습니다.`;
    } else if ((lowerInput.includes('주말') || lowerInput.includes('주말에')) && lowerInput.includes('날씨')) {
      response = '아직 데이터가 없습니다.';
    } else if(lowerInput.includes('위치')){
      response = `위도 : ${location.latitude} 경도 : ${location.longitude}`;
    } else {
      response = '죄송해요, 다시 한 번 말씀해주세요.';
    }
  
    return response;
  };  

  const handleBotResponse = (userInput) => {
    const botResponse = generateWeatherResponse(userInput);
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { text: botResponse, type: 'bot' },
    ]);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

return (
  <div className='chatbot-container'>
    <div className='chat-container'>
      {chatLog.map((entry, index) => (
        <div key={index}>
          {entry.type === 'user' ? (
            <div className='user-message'>사용자 : {entry.text}</div>
          ) : entry.type === 'bot' ? (
            <div className='bot-message'>챗봇 : {entry.text}</div>
          ) : (
            <button
              className='button-message'
              onClick={() => handleButtonClick(entry.text)}
            >
              {entry.text}
            </button>
          )}
        </div>
      ))}
    </div>
    <div className='input-container'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUserInput();
        }}
      >
        <input
          className='user-input'
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="질문을 입력해주세요."
        />
        <button className='send-button' type="submit">입력</button>
      </form>
    </div>
  </div>
);
};

export default WeatherChatBot;