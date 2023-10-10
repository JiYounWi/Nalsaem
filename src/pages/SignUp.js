import React, { useState } from 'react';
import './SignUp.css';
import HealthInfo from '../component/HealthInfo';
import axios from 'axios';

function SignUp () {
 // 초기값 세팅 - 아이디, 이름, 비밀번호, 비밀번호확인, 생년월일, 성별
 const [id, setId] = useState("");
 const [gender, setGender] = useState(null);
 const [name, setName] = useState("");
 const [password, setPassword] = useState("");
 const [passwordConfirm, setPasswordConfirm] = useState("");
 const [birth, setBirth] = useState("");
 

// 오류메세지 상태 저장
const [idMessage, setIdMessage] = useState("");
const [nameMessage, setNameMessage] =  useState("");
const [passwordMessage, setPasswordMessage] =  useState("");
const [passwordConfirmMessage, setPasswordConfirmMessage] =  useState("");
const [birthMessage, setBirthMessage] =  useState("");

// 유효성 검사
const [isId, setIsId] =  useState(false);
const [isname, setIsName] =  useState(false);
const [isPassword, setIsPassword] =  useState(false);
const [isPasswordConfirm, setIsPasswordConfirm] =  useState(false);
const [isBirth, setIsBirth] =  useState(false);

// name
const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);
 
    if (currentName.length < 2 || currentName.length > 10) {
      setNameMessage("잘못된 이름입니다.");
      setIsName(false);
    } else {
      setNameMessage("사용 가능한 이름 입니다.");
      setIsName(true);
    }
  };

  const handleGenderClick = (selectedGender) => {
    if (selectedGender === 'female') {
      setGender(0);
    } else if (selectedGender === 'male') {
      setGender(1);
    }
  };

//id
const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    if (!idRegExp.test(currentId)) {
      setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
      setIsId(false);
    } else {
      setIdMessage("사용가능한 아이디 입니다.");
      setIsId(true);
    }
  };

// pw
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };

  // pwconfirm
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.!");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치합니다.");
      setIsPasswordConfirm(true);
    }
  };

//birth
  const onChangeBirth = (e) => {
    const currentBirth = e.target.value;
    setBirth(currentBirth);
  };

  //선택한 질환
  const [selectedDiseases, setSelectedDiseases] = useState([]);

  const handleSelectedDiseases = (diseases) => {
    setSelectedDiseases(diseases);
  };

  const handleSignUp = () => {
    // 이름, 생년월일, 성별, 아이디, 비밀번호, 비밀번호 재확인이 입력되지 않으면 가입하지 못하도록 막는 코드
    if (!name || !birth || gender === null || !id || !password || !passwordConfirm) {
      return alert('가입 정보를 모두 입력해주세요.'); // 화면 전환을 막습니다.
    }

    const userData = {
      loginId : id,
      password : password,
      userName : name,
      birthDate : birth,
      isMale : gender === 1? "1" : 0,
      symptom : selectedDiseases.join(',')
    };

    axios
    .post("https://udega.net:8080/user/save", userData)
    .then(() => {
      console.log('전송 완료')
      // if (response.status === 200) {
      //   console.log("유저 데이터 저장에 성공했습니다 :", response.data);
      //   navigate('/');
      // } else {
      //   // console.log("유저 데이터 저장 중 에러가 발생했습니다 :", response.data);
      // }
    })
    .catch((error) => {
      console.error("Error while sending POST request:", error);
    });
  };

  return (
    <>
    <div className='main-signup'>
      <div className='form'>
        <p className='basic-info-1'>기본정보</p>
        <hr style={{marginTop : '-20px', marginBottom : '45px', width: '800px'}}/>

        <div className="form-el">
         <label htmlFor="name" className='label'>이름</label>
         <input 
          className='input-info' 
          id="name" 
          name="name" 
          value={name} 
          onChange={onChangeName}
          placeholder='    이름을 입력해주세요'
          />
         <p className="message">{nameMessage}</p>
       </div>
       
       <div className="form-el">
          <label htmlFor="birth" className='label'>생년월일</label>
          <input
            className='input-info'
            id="birth"
            name="birth"
            value={birth}
            onChange={onChangeBirth}
            placeholder='     생년월일을 입력해주세요 ex) 19870326'
          />
          <p className="message">{birthMessage}</p>
        </div>

        <div className='form-sex'>
          <label htmlFor='sex' className='label-sex'>성별</label>
          <button className={`sex-f ${gender ? 'selected' : ''}`} onClick={() => handleGenderClick('male')}>남자</button>
          <button className={`sex-m ${gender ? '' : 'selected'}`} onClick={() => handleGenderClick('female')}>여자</button>
          {gender !== null && (
            <p>성별: {gender === 0 ? 'Female' : 'Male'}</p>
          )}
        </div>

        <hr style={{marginTop : '45px' ,marginBottom:'-20px', width: '800px'}}/>
        <p className='basic-info'>계정정보</p>
        <hr style={{marginTop : '-20px',marginBottom: '45px', width: '800px'}}/>

        <div className="form-el">
        <div style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft : '182px'
        }}>
          <label htmlFor="id" className='label'>아이디</label>
            <input 
              className='input-info' 
              id="id" 
              name="id" 
              value={id} 
              onChange={onChangeId}
              placeholder='    아이디를 입력해주세요'
            />
            <button className='DuplicateCheck'>중복확인</button>
          </div>
          <p className="message"> {idMessage} </p>
        </div>

        <div className="form-el">
          <label htmlFor="password" className='label'>비밀번호</label>
          <input
            className='input-info'
            id="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            placeholder='    비밀번호를 입력해주세요'
          />
          <p className="message">{passwordMessage}</p>
        </div>

        <div className="form-el">
          <label htmlFor="passwordConfirm" className='label'>재확인</label>
          <input
            className='input-info'
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
            placeholder='    비밀번호를 다시 한 번 입력해주세요'
          />
          <p className="message">{passwordConfirmMessage}</p>
        </div>

        <hr style={{marginBottom: '-20px',marginTop: '45px', width: '800px'}}/>
        <p className='basic-info'>건강정보</p>
        <hr style={{marginTop : '-20px', width: '800px'}}/>

        <p style={{fontSize : '25px', fontWeight: 'bold', marginBottom:'-10px'}}>아래 사항 중에 해당되는 질환이 있나요?</p>
        <p style={{fontSize : '20px', fontWeight : 'bold', color:'#434544'}}>해당 질병을 클릭해주세요.(복수선택 가능)</p>
        
        <HealthInfo onSelectDiseases={handleSelectedDiseases} />

      </div>
    </div>
    
    <p></p>
    <button className='submit' onClick={handleSignUp}>가입하기</button>
    </>
  );
};

export default SignUp;
