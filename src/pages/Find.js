import React, { useEffect, useState } from 'react'

import { BiSolidBookReader } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

export default function Find() {

  const navigate = useNavigate()
  const [IDorPW, setIDorPW] = useState(true)

  const [userID, setUserID] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직을 여기에 추가하세요.
    // console.log('로그인 시도:', username, password);
    // 예를 들어, 로그인 API 호출 등
  };

  return (
      <div className='full-content'>
        
        <div className="member-container">

          <div className='logo'><BiSolidBookReader></BiSolidBookReader>INGS</div>

          <div className='select-box-find-type'>
            <div className={'find-type' + (IDorPW ? ' active' : '')} onClick={() => setIDorPW(!IDorPW)}>아이디 찾기</div>
            <div className={'find-type' + (IDorPW ? '' : ' active')} onClick={() => setIDorPW(!IDorPW)}>비밀번호 찾기</div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group id-form">
              <label htmlFor="userID">아이디</label>
              <input 
                type="text" 
                id="userID" 
                value={userID} 
                onChange={(e) => setUserID(e.target.value)} 
              />
            </div>
            <div className="form-group phone-form">
              <label htmlFor="userPhone">휴대전화번호</label>
              <input 
                type="number" 
                id="userPhone" 
                value={userPhone} 
                onChange={(e) => setUserPhone(e.target.value)} 
              />
            </div>
            <button type="submit" className='login-submit' onClick={() => alert('not yet implemented')}>인증번호 전송</button>
            {/* <div className='other-option'>
              <p onClick={() => navigate('/signUp')}>회원가입</p>
              <p onClick={() => navigate('/Find')}>아이디 찾기</p>
              <p onClick={() => navigate('/Find')}>비밀번호 찾기</p>
            </div> */}
            
          </form>

        </div>

      </div>


  )
}
