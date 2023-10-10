import React from 'react'
import { Link } from 'react-router-dom';
import './MyPage.css';
import {BiUser} from 'react-icons/bi';

export default function MyPage() {
  // userInfo 변수를 선언
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

  // userInfo가 null 또는 undefined인 경우에 대한 처리
  if (!userInfo) {
    return (
      <div>
        <p>사용자 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className='main_mypage'>
      <div className='user_data'>
        <div className='user_data_img' style={{
          width : "130px", height : "130px", borderRadius: '50%',
          marginTop : '80px',
          display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#B6CEC3'
        }}>
          <BiUser size={80}/>
        </div>
        
        <p>{userInfo.userName}<br/>{userInfo.birthDate}</p>
      </div>

      <hr />

      <div className='mypage_button'>
        <button>정보수정</button>
        <button>로그아웃</button>
      </div>
    </div>
  )
}
