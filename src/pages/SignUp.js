import React, { useEffect, useState } from 'react'

import { BiSolidBookReader } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

  const navigate = useNavigate()
  const [userID, setID] = useState('');
  const [userPW, setPW] = useState('');
  const [userPWC, setPWC] = useState('');
  const [userName, setName] = useState('');
  // const [userSex, setSex] = useState('');
  const [userPhone, setPhone] = useState('');
  const [userEmail, setEmail] = useState('');

  const [checkMessage, setCheckMessage] = useState({
    id: '',
    pw: '',
    pwCheck: '',
    name: '',
    phone: '',
    email: ''
  })

  const handleSubmit = (e) => {

    e.preventDefault();

    // 영어소문자/숫자 8-16자 조합으로 만들어주세요.
    const idCond = /[a-z0-9]{8,16}/.test(e.target[0].value)
    // console.log('아이디: ' + idCond)

    // 8~16자로 만들어주세요.
    const pwCond = /[a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,16}/.test(e.target[1].value)
    // console.log('비밀번호 : ' + pwCond)

    // 비밀번호가 일치하지 않습니다.
    const pwcCond = e.target[1].value === e.target[2].value
    // console.log('비밀번호 확인 : ' + pwcCond)

    // 한글로 써주세요.
    const nameCond = /^[가-힣]{2,}$/.test(e.target[3].value)
    // console.log('이름 : ' + nameCond)

    // console.log('성별 : ' + e.target[4].value)

    // 010을 포함한 8자리 숫자를 입력해주세요.
    const phoneCond = /^010[0-9]{8}$/.test(e.target[5].value)
    // console.log('폰 : ' + phoneCond)

    // 올바른 이메일 양식으로 써주세요.
    const emailCond = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}/.test(e.target[6].value)
    // console.log('이메일 : ' + emailCond)

    const termsChecked = e.target[7].checked

    setCheckMessage({
      id: idCond ? '' : '영어소문자/숫자 8-16자 조합으로 만들어주세요.',
      pw: pwCond ? '' : '8~16자로 만들어주세요.',
      pwCheck: pwcCond ? '' : '비밀번호가 일치하지 않습니다.',
      name: nameCond ? '' : '한국어 이름을 써주세요.',
      phone: phoneCond ? '' : '010을 포함한 8자리 숫자를 입력해주세요.',
      email: emailCond ? '' : '올바른 이메일 양식으로 써주세요.'
    })

    if (!idCond || !pwCond || !pwcCond || !nameCond || !phoneCond || !emailCond) {
      alert('회원가입 양식을 다시 작성해주세요.')
    }
    else if (!termsChecked){
      alert('이용약관에 체크해주세요.')
    } else {
      alert('가입이 완료되었습니다.')
      navigate('/login')
    }

  }


  return (
      <div className='full-content'>
        
        <div className="member-container">

          <div className='logo'><BiSolidBookReader></BiSolidBookReader>INGS</div>

          <form onSubmit={handleSubmit}>
            <div className="form-group id-form">
              <label htmlFor="userID">아이디</label>
              <input 
                type="text" 
                id="userID" 
                value={userID} 
                onChange={(e) => setID(e.target.value)} 
              />
              <div className='check-msg'>
                {checkMessage.id}
              </div>
            </div>
            <div className="form-group pw-form">
              <label htmlFor="userPW">비밀번호</label>
              <input 
                type="password" 
                id="userPW" 
                value={userPW} 
                onChange={(e) => setPW(e.target.value)} 
              />
              <div className='check-msg'>
                {checkMessage.pw}
              </div>
            </div>
            <div className="form-group pw-check-form">
              <label htmlFor="userPWC">비밀번호 확인</label>
              <input 
                type="password"
                id="userPWC"
                value={userPWC} 
                onChange={(e) => setPWC(e.target.value)} 
              />
              <div className='check-msg'>
                {checkMessage.pwCheck}
              </div>
            </div>
            <div className="form-group name-form">
              <label htmlFor="userName">이름</label>
              <input j
                type="text" 
                id="userName" 
                value={userName} 
                onChange={(e) => setName(e.target.value)} 
              />
              <div className='check-msg'>
                {checkMessage.name}
              </div>
            </div>
            <div className="form-group sex-form">
              <label htmlFor="userSex">성별</label>
              <select id='userSex'>
                <option value='male'>남성</option>
                <option value='female'>여성</option>
                <option value='etc'>기타</option>
                <option value='private'>비공개</option>
              </select>
              <div className='check-msg'>
                {checkMessage.sex}
              </div>
            </div>
            <div className="form-group phone-form">
              <label htmlFor="userPhone">휴대전화번호</label>
              <input j
                type="text" 
                id="userPhone" 
                value={userPhone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
              <div className='check-msg'>
                {checkMessage.phone}
              </div>
            </div>
            <div className="form-group email-form">
              <label htmlFor="userEmail">이메일</label>
              <input j
                type="text" 
                id="userEmail" 
                value={userEmail} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <div className='check-msg'>
                {checkMessage.email}
              </div>
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
