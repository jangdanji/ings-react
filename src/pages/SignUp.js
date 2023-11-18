import React, { useEffect, useState } from 'react'

import { BiSolidBookReader } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

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
      <div className='full-content'>
        
        <div className="member-container">

          <div className='logo'><BiSolidBookReader></BiSolidBookReader>INGS</div>

          <form onSubmit={handleSubmit}>
            <div className="form-group id-form">
              <label htmlFor="username">아이디</label>
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
            <div className="form-group pw-check-form">
              <label htmlFor="password">비밀번호 확인</label>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className="form-group name-form">
              <label htmlFor="password">이름</label>
              <input j
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className="form-group gender-form">
              <label htmlFor="password">성별</label>
              <input j
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className="form-group phone-form">
              <label htmlFor="password">휴대전화번호</label>
              <input j
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className="form-group email-form">
              <label htmlFor="password">이메일</label>
              <input j
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className='privacy-policy'>
              <pre>
                [개인정보 수집 및 이용에 대한 안내]

                1. 수집하는 개인정보 항목
                  - 필수 정보: 이메일, 비밀번호, 닉네임
                  - 선택 정보: 휴대폰 번호, 영어 능력 수준

                2. 개인정보의 수집 및 이용 목적
                  - 회원 관리: 회원제 서비스 이용에 따른 본인 확인, 개인식별, 불량 회원의 부정 이용 방지와 비인가 사용 방지
                  - 서비스 제공: 컨텐츠 제공, 특정 맞춤 서비스 제공, 문의사항 또는 불만 처리
                  - 마케팅 및 광고에 활용: 신규 기능 및 행사, 이벤트 정보 등의 안내

                3. 개인정보의 보유 및 이용 기간
                  - 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 법령에 의해 보존할 필요성이 있는 경우 일정 기간 저장 후 파기합니다.

                [이용약관]

                1. 서비스 이용 조건 및 운영 정책
                  - 본 사이트는 회원들이 영어 학습에 관련된 정보를 공유하고 학습할 수 있는 커뮤니티입니다.
                  - 회원은 서비스 이용 시 허위 정보를 제공하거나 타인의 정보를 도용해서는 안 됩니다.
                  - 모든 회원은 커뮤니티 규칙을 준수해야 하며, 이를 위반할 경우 서비스 이용 제한을 받을 수 있습니다.

                2. 저작권 및 책임 제한
                  - 본 사이트에 게시된 자료들의 저작권은 해당 저작자와 본 사이트에 있습니다.
                  - 회원이 사이트 내에서 게시하는 내용에 대한 책임은 게시자에게 있으며, 사이트는 게시된 내용에 대해 책임을 지지 않습니다.

                3. 서비스 변경, 중단 및 해지
                  - 본 사이트는 서비스의 일부 또는 전체를 사전 통지 없이 변경하거나 중단할 권리를 가집니다.
                  - 회원이 이용약관을 위반한 경우, 사전 통지 없이 회원 자격을 상실시킬 수 있습니다.

              </pre>
            </div>

            <div class="terms-checkbox">
              <input type="checkbox" id="termsAndPrivacy" name="termsAndPrivacy"></input>
              <label for="termsAndPrivacy">이용약관 및 개인정보 수집에 동의합니다.</label>
            </div>
            

            <button type="submit" className='login-submit'>회원가입</button>
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
