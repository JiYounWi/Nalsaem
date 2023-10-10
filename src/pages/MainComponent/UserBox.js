import React from 'react';
import './UserBox.css';
import {BsFillHeartPulseFill} from "react-icons/bs";
import {TbDeviceHeartMonitor} from "react-icons/tb";
import {RiMentalHealthFill} from 'react-icons/ri';
import {PiSirenBold} from 'react-icons/pi';
import {MdOutlineNaturePeople} from 'react-icons/md';

function UserBox() {
  // userInfo 변수를 선언
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

  // userInfo가 null 또는 undefined인 경우에 대한 처리
  if (!userInfo) {
    return (
      <div>
        <p className='userWelcom'>사용자 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const symptomElements = userInfo.symptom.split(',')[0];

  return (
    <div>
      <p className="userWelcom">{userInfo.userName}님,<br/>환영합니다!</p>
      <hr style={{ width: '480px',border: '3px solid white'}}/>

      <button className='btn' >측정하기</button>

      <div className='health'>
        <div className='icons'>
          <BsFillHeartPulseFill size={45} color='white'/>
          <TbDeviceHeartMonitor size={50} color='white'/>
          <RiMentalHealthFill size={50} color='white'/>
        </div>

        <div className="health-box">
            <div className="health-box1">

            </div>
            <div className="health-box1">

            </div>
            <div className="health-box1">
              <p style={{fontSize : '35px', fontWeight : 'bold', color : '#579878'}}>{symptomElements}</p>
            </div>
        </div>
      </div>

      <hr style={{ width: '480px',border: '3px solid white'}}/>


      <p className="gooutcontrol">외출신호등</p>
      <div className='gooutcontrol-box'>
        <div className="gooutcontrol-box1">
        </div>
        <div className="gooutcontrol-box2">
          <MdOutlineNaturePeople size={80} color='white' style={{marginTop: '15px'}}/>
        </div>
        <div className="gooutcontrol-box3">

        </div>
      </div>

      <hr style={{ width: '480px',border: '3px solid white'}}/>

      <div className='alarm'>
        <div className='alarm-study'>
          <PiSirenBold size={35} color='#F55757'/>
        </div>
      </div>
    </div>
  );
}

export default UserBox;
