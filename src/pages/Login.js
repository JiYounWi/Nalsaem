import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import logo from '../image/logoCol.png';
import './Login.css';
import axios from 'axios';

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [className, setClassName] = useState("login_button_before");
  const [ useId, setUseId] = useState(false);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const onChangeId = (e) => {
    //id값이 onChangeId 함수가 끝나야만 등록된다.
    setId(e.target.value);
    // input값이 바뀔 때 마다 (onChange) 그 값을 감지하기 위해서 
      };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
      };

  const onClickLogin = () => {
    if (!id || !password) {
      return alert('가입 정보를 모두 입력해주세요.'); // 화면 전환을 막습니다.
    }

    axios.get(`https://udega.net:8080/user/show?id=${id}`)
    .then((Response)=>{
      console.log(Response.data);
      setUserData(Response.data);

      sessionStorage.setItem('userInfo', JSON.stringify(Response.data));
      navigate('/main')
    })
    .catch((error) => {
      console.error("로그인 요청 중 오류 발생:", error);
    });
  }


  return (
      <div className='main_login'>
        <div className="login_container">
          <img src={logo} alt="logo" className="login_logo"/>
          <div className="login_account">
            <input
              onChange={onChangeId}
              value={id}
              type="text"
              className="account_id"
              placeholder="아이디"
            /><br/>
            <input
              onChange={onChangePassword}
              type="password"
              className="account_pw"
              placeholder="비밀번호"
            />
          </div>
          
            <div className='login_button_content'>
              <button className='login_button' onClick={onClickLogin}>로그인</button>
            </div>
        </div>
      <br />

      <hr style={{marginRight : '10%', marginLeft : '10%'}}/>

      <div className='buttons'>
        <Link to="/signup">
          <button>회원가입</button>
        </Link>
        <br/>
        <Link to="/findaccount">
          <button>계정찾기</button>
        </Link>
      </div>
      
    </div>
  );
};

export default Login;