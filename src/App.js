/* eslint-disable */

import './App.scss';

import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import Home from './pages/Home'
import Board from './pages/Board'
import Post from './pages/Post'
import Calendar from './pages/Calendar'

import { BiSolidBookReader } from "react-icons/bi";

import { setBoardData, searchOption } from './redux/store';
import { useDispatch } from 'react-redux';

function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  return (
    <div className="App">
      <header className="header">
        <nav className='navbar'>
          <div className='logo' onClick={() => navigate('/')}><BiSolidBookReader></BiSolidBookReader>INGS</div>
          <div className='user-menu'>
            <ul>
              <li>
                <input type='text' placeholder='검색' onKeyPress={ (e) => {

                  if (e.key === 'Enter') {
                    if (e.target.value.length < 2) alert('2글자 이상 입력해주세요.')
                    else {
                      navigate('/board/0')
                      dispatch( searchOption(['all', e.target.value]) )
                    }
                  }

                }}/>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <div className='content'>

          <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/calendar' element={<Calendar/>}/>
                <Route path='/board/:categoryID' element={<Board/>}/>
                <Route path='/post/:id' element={<Post/>}/>
          </Routes>

      </div>

      <footer className='footer'>

        <div className='footer-wrap'>

          <div className='logo'>
            <BiSolidBookReader></BiSolidBookReader>INGS
          </div>

          <div className='footer-menu'>
            <ul>
              <li>이용약관</li>
              <li>개인정보 취급방침</li>
              <li>청소년 보호정책</li>
              <li>이메일주소 무단수집거부</li>
              <li>저자 강사 모집</li>
              <li>광고 제휴 문의</li>
              <li>고객센터</li>
              <li>서비스 상태</li>
            </ul>
          </div>

          <div className='copyright'>
            © 2000-2023 INGS STUDY Inc.
          </div>
        </div>
      </footer>


      


    </div>
  );
}

export default App;
