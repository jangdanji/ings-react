import React, { useEffect, useState } from 'react'

import { BiSolidBookReader } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

export default function Find() {

  const navigate = useNavigate()
  const [IDorPW, setIDorPW] = useState(true)

  const [isCertSend, setCertSend] = useState(false)
  const [isCertDone, setCertDone] = useState(false)
  

  const [userID, setUserID] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userCertNum, setUserCertNum] = useState('');

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
            <div className={'find-type' + (IDorPW ? ' active' : '')} onClick={() => IDorPW === false && setIDorPW(!IDorPW)}>아이디 찾기</div>
            <div className={'find-type' + (IDorPW ? '' : ' active')} onClick={() => IDorPW === true && setIDorPW(!IDorPW)}>비밀번호 찾기</div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group name-form">
              <label htmlFor="userName">이름</label>
              <input 
                type="text" 
                id="userName" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
              />
            </div>
            {
              IDorPW === true &&
              <>
                <div className="form-group email-form">
                  <label htmlFor="userEmail">이메일</label>
                  <input 
                    type="number" 
                    id="userEmail" 
                    value={userEmail} 
                    onChange={(e) => setUserEmail(e.target.value)} 
                  />
                </div>
              </>

            }

            {
              IDorPW === false &&
              <>
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
                    type="text" 
                    id="userPhone" 
                    value={userPhone} 
                    onChange={(e) => setUserPhone(e.target.value)} 
                  />
                  <div className='cert-btn' onClick={ () => {
                    setCertSend(true); alert('인증번호가 전송되었습니다.');
                  }}>
                    인증번호 전송
                  </div>
                </div>
              </>
            }

            {
              isCertSend === true &&

              <div className="form-group cert-form">
                <label htmlFor="userCertNum">인증번호</label>
                <input 
                  type="text" 
                  id="userCertNum" 
                  value={userCertNum} 
                  onChange={(e) => setUserCertNum(e.target.value)} 
                />
                  <div className='cert-btn' onClick={ () => {
                    alert('올바른 인증번호 입니다.');
                    setCertDone(true)
                  }}>
                    확인
                  </div>
              </div>
            }


            <button type="submit" className='login-submit' onClick={() => {

              IDorPW === true && alert('이메일로 아이디가 전송되었습니다.')

              isCertDone && alert('임시비밀번호가 전송되었습니다.')

              
              /* 인증번호 전송완료, 인증완료 state 초기화 */
              setCertSend(false); setCertDone(false);

            }}>{IDorPW ? '이메일로 아이디 받기' : '임시비밀번호 받기'}</button>
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
