import React, { useEffect, useState } from 'react'

import { BiSolidBookReader } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { setLoginStatus } from '../redux/store'

export default function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [member, loadMember] = useState([])

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { isLogin, loginUser } = useSelector((state) => ({
    isLogin: state.userState.loginStatus,
    loginUser: state.userState.loginData
  }))

  const [checkMessage, setCheckMessage] = useState({
    id: '',
    pwNow: '',
    pw: '',
    pwCheck: '',
    name: '',
    phone: '',
    email: ''
  })

  const [userID, setID] = useState('');
  const [userNowPW, setNowPW] = useState('');
  const [userPW, setPW] = useState('');
  const [userPWC, setPWC] = useState('');
  const [userName, setName] = useState('');
  // const [userSex, setSex] = useState('');
  const [userPhone, setPhone] = useState('');
  const [userEmail, setEmail] = useState('');


  const handleSubmit = (e) => {

    e.preventDefault();

    // 영어소문자/숫자 8-16자 조합으로 만들어주세요.
    const idCond = /[a-z0-9]{8,16}/.test(e.target[0].value)
    // console.log('아이디: ' + idCond)

    const nowPwCond = e.target[1].value === loginUser.userPW

    // 8~16자로 만들어주세요.
    const pwCond = /[a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,16}/.test(e.target[2].value)
    // console.log('비밀번호 : ' + pwCond)

    // 비밀번호가 일치하지 않습니다.
    const pwcCond = e.target[1].value === e.target[3].value
    // console.log('비밀번호 확인 : ' + pwcCond)

    // 한글로 써주세요.
    const nameCond = /^[가-힣]{2,}$/.test(e.target[4].value)
    // console.log('이름 : ' + nameCond)

    // console.log('성별 : ' + e.target[5].value)

    // 010을 포함한 8자리 숫자를 입력해주세요.
    const phoneCond = /^010[0-9]{8}$/.test(e.target[6].value)
    // console.log('폰 : ' + phoneCond)

    // 올바른 이메일 양식으로 써주세요.
    const emailCond = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}/.test(e.target[7].value)
    // console.log('이메일 : ' + emailCond)

    setCheckMessage({
      id: idCond ? '' : '영어소문자/숫자 8-16자 조합으로 만들어주세요.',
      pwNow: nowPwCond ? '' : '현재 비밀번호와 일치하지 않습니다.',
      pw: pwCond ? '' : '8~16자로 만들어주세요..',
      pwCheck: pwcCond ? '' : '비밀번호가 일치하지 않습니다.',
      name: nameCond ? '' : '한국어 이름을 써주세요.',
      phone: phoneCond ? '' : '010을 포함한 8자리 숫자를 입력해주세요.',
      email: emailCond ? '' : '올바른 이메일 양식으로 써주세요.'
    })

    if (!idCond || !nowPwCond || !pwCond || !pwcCond || !nameCond || !phoneCond || !emailCond) {
      alert('다시 작성해주세요.')
    } else {
      alert('수정이 완료되었습니다.')
      navigate('/')
    }

  }



  return (
      <div className='full-content'>
        
        <div className="member-container">

          <div className='logo'><BiSolidBookReader></BiSolidBookReader>INGS</div>

          <div className='my-detail-page'>

            <form onSubmit={handleSubmit}>
            <div className="form-group id-form">
              <label htmlFor="userID">아이디</label>
              <input readOnly={true}
                type="text" 
                id="userID" 
                value={loginUser.userID} 
                onChange={(e) => setID(e.target.value)} 
              />
              <div className='check-msg'>
                {checkMessage.id}
              </div>
            </div>
            <div className="form-group now-pw-form">
              <label htmlFor="userNowPW">현재 비밀번호</label>
              <input 
                type="password" 
                id="userNowPW" 
                value={userNowPW} 
                onChange={(e) => setNowPW(e.target.value)} 
              />
              <div className='check-msg'>
                {checkMessage.pwNow}
              </div>
            </div>
            <div className="form-group pw-form">
              <label htmlFor="userPW">변경할 비밀번호</label>
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
              <label htmlFor="userPWC">변경할 비밀번호 확인</label>
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
                value={loginUser.userName} 
                onChange={(e) => setName(e.target.value)} 
              />
              <div className='check-msg'>
                {checkMessage.name}
              </div>
            </div>
            <div className="form-group sex-form">
              <label htmlFor="userSex">성별</label>
              <select id='userSex' readOnly={true} value={loginUser.userGender}>
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
                value={loginUser.userPhone} 
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
                value={loginUser.userEmail} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <div className='check-msg'>
                {checkMessage.email}
              </div>
            </div>



              <button type="submit" className='login-submit'>정보 수정하기</button>

            </form>

          </div>


        </div>

      </div>


  )
}
