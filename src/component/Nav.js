import React from 'react'
import {Link} from 'react-router-dom';
import './Nav.css';
import logoRow from '../image/logoRow.png';
import axios from 'axios';

export default function Nav() {
  const onClickLogout = () => {
    sessionStorage.clear()
  }

  return (
    <div className="navbar">
      <Link className='logoImage' to={'/main'}>
        <img src={logoRow} className="logoImage" />
      </Link>
      <div className='btnMenu'>
        <Link className="navbarMenu" to ={'/mypage'}>마이페이지</Link>

        <button className='navbarMenu' onClick={onClickLogout}>
          <Link className="navbarMenu" to ={'/'}>로그아웃</Link>
        </button>
      </div>
    </div>
  )
};