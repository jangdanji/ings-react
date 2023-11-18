import React, { useEffect, useState } from 'react'

import { BiSolidBookReader } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직을 여기에 추가하세요.
    console.log('로그인 시도:', username, password);
    // 예를 들어, 로그인 API 호출 등
  };

  return (
    <div className='content-wrap'>

      <div className='full-content'>
        
        <div className="login-container">

          <div className='logo'><BiSolidBookReader></BiSolidBookReader>INGS</div>

          <form onSubmit={handleSubmit}>
            <div className="form-group id-form">
              <label htmlFor="username">사용자 이름</label>
              <input 
                type="text" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <div className="form-group pw-form">
              <label htmlFor="password">비밀번호</label>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <button type="submit" className='login-submit'>로그인</button>
            <div className='other-option'>
              <p>회원가입</p>
              <p>아이디 찾기</p>
              <p>비밀번호 찾기</p>
            </div>
            
          </form>

        </div>

      </div>


    </div>


  )
}
