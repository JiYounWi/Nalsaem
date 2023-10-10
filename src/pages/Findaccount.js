import React, { useState } from 'react';

const Findaccount = () => {
  // 상태 변수를 사용하여 사용자의 기본 정보를 저장합니다.
  

  return (
    <div>
    <h1>회원가입시 입력한 전화번호로 조회가 가능합니다.</h1>
        <div className="form">
            <div className="form-el">
                <label htmlFor="name">이름</label> <br />
                <input id="name" name="name"  />
                
            </div>

            <div className="form-el">
                <label htmlFor="phone">전화번호</label> <br />
                <input id="phone" name="phone"  />
            </div>            

        </div>

        <br />
        <button type="submit">아이디찾기</button>
        <br />
        <button type="submit">비밀번호찾기</button>

    </div>
  );
};

export default Findaccount;
