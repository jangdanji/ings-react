import React, { useEffect, useState } from 'react'

import { BiSolidBookReader } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { setLoginStatus } from '../redux/store'

import { HiMiniXMark } from "react-icons/hi2";

export default function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [member, loadMember] = useState([])

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect( () => {
    fetch(process.env.PUBLIC_URL + '/data.json')
    .then((response) => response.json())
    .then((data) => {
      loadMember(data['member'])
    })
    .catch((error) => console.log('fetch 실패 : ' + error))
  }, [])

  const [closeAlert, setCloseAlert] = useState(false)



  const handleSubmit = (e) => {

    e.preventDefault();

    const idValue = e.target[0].value
    const pwValue = e.target[1].value

    const findMember = member.find((user) => {
      return user.userID === idValue && user.userPW === pwValue
    })

    if (findMember === undefined) {
      alert('존재하지 않는 사용자입니다.')
    }
    else {

      alert('안녕하세요 ' + findMember.userName + '님!')
      dispatch( setLoginStatus([true, findMember]) )
      navigate('/')
    }
  }

  return (
      <div className='full-content'>
        
        <div className="member-container">

          <div className='logo'><BiSolidBookReader></BiSolidBookReader>INGS</div>

          <form onSubmit={handleSubmit}>

            {
              !closeAlert &&
              <>
                <div className='test-alert'>
                  <p className='alert-text'>
                    test1234, test1234로 테스트 로그인이 가능합니다.
                  </p>
                  <p className='icon' style={{color: 'red'}} onClick={() => setCloseAlert(true)}><HiMiniXMark /></p>
                </div>
              </>
            }


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
            <button type="submit" className='login-submit'>로그인</button>
            <div className='other-option'>
              <p onClick={() => navigate('/signUp')}>회원가입</p>
              <p onClick={() => navigate('/Find')}>계정 찾기</p>
            </div>
            
          </form>

        </div>

      </div>


  )
}
