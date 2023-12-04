/* eslint-disable */

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // for selectable

import { BiSolidBookReader } from "react-icons/bi";
import { AiFillCalendar, AiFillPlusCircle } from "react-icons/ai";
import { RiPencilFill, RiDeleteBinFill } from "react-icons/ri";
import { LuCalendar, LuCalendarX, LuCalendarPlus } from "react-icons/lu";

import Loading from './Loading'

import { useNavigate } from 'react-router-dom';
import { setLoginStatus } from '../redux/store';

export default function Calendar() {

  const dispatch = useDispatch()
  const [pageData, setPageData] = useState(null)

  // const mySchedule = useSelector((state) => state.mySchedule)

  const [mySchedule, setSchedule] = useState(null)

  const navigate = useNavigate()

  
  const { isLogin, loginUser } = useSelector((state) => ({
    isLogin: state.userState.loginStatus,
    loginUser: state.userState.loginData
  }))


  useEffect(() => {

    fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      setPageData(data)
    })
    .catch((error) => console.log(error))

  }, [])

  if (pageData == null) {
    <Loading></Loading>
  }
  else {
      
    return (
      <div className='content-wrap'>
        <div className='main-content'>
          <div className='calendar'>
            <FullCalendar
              plugins={[ interactionPlugin, dayGridPlugin ]}
              initialView='dayGridMonth'
              events={pageData['schedule']}

              height='auto'
              contentHeight='auto'

              buttonText={{
                today : '오늘',
                // month:    'month',
                // week:     'week',
                // day:      'day',
                // list:     'list'
              }}

              displayEventTime={false} // 시간은 쓰지말자
              eventDisplay='block' // event 모양
              eventColor='#ccc'

              dayMaxEvents={2} /* n개 이상 보이고 그 외는 +1 이런식으로 view more 버튼 생김 */
              

              dateClick={(info) => {
                // alert('클릭 ' + info.dateStr); /* https://fullcalendar.io/docs/dateClick 객체 속성 참고하셈 */
                setSchedule(info.dateStr)
              }}

              eventClick={(info) => {
                setSchedule(info.event.startStr.split('T')[0])
              }}

              selectable={true}
            />
          </div>

          {/* <div className='description'>
            <div className='icon'>
              <AiFillCalendar></AiFillCalendar>
            </div>
            
          </div> */}

        </div>

        <div className='side-content'>

        <div className='my-page'>
              {
                !isLogin &&
                <>
                  <p className='message-box'>로그인하셔서 개인 일정을 관리해보세요.</p>
                  <div className='login' onClick={() => navigate('/login')}>
                    <p className='logo'><BiSolidBookReader></BiSolidBookReader>INGS 로그인</p>
                  </div>
                  <div className='login-options'>
                    <ul>
                      <li onClick={() => navigate('/signUp')}>회원가입</li>
                      <li onClick={() => navigate('/find')}>계정찾기</li>
                    </ul>
                  </div>
                </>
              }

              {
                isLogin &&
                <>
                  <p className='message-box'>안녕하세요, {loginUser.userName}님!</p>
                  <div className='my-page'>
                    <p className='logo'>
                      <BiSolidBookReader></BiSolidBookReader>
                      {loginUser.userName} (가입일 : {
                        new Date(loginUser.userJoinDate).toISOString().split('T')[0]
                    })</p>
                  </div>


                  <div className='login-options'>
                    <ul>
                      <li onClick={() => navigate('/myPage')}>나의 정보</li>
                      <li onClick={() => navigate(`/board/0/?searchWord=${loginUser.userName}&searchOption=user`)}>나의 글</li>
                      <li onClick={() => {
                        dispatch( setLoginStatus([false, '']) )
                        alert('로그아웃 되었습니다.')
                        navigate('/')
                      }}>로그아웃</li>
                    </ul>
                  </div>
                </>
              }

            </div>

          {
            mySchedule != null &&
            <>
              <div className='selected-date'>
                <div className='head'>
                  
                </div>
                
                <div className='schedule'>
                  <div className='title'>
                    <LuCalendarPlus></LuCalendarPlus> 일정 ({mySchedule})
                  </div>
                  
                  <div className='set-schedule'>
                    {
                      pageData['schedule'].filter((schedule) => {

                        const a = new Date(mySchedule);
                        const b = new Date(schedule.date.split('T')[0]);
                  
                        return a.getTime() == b.getTime()
                      }).map((sche) => {
                        return(
                          <>
                            <div className='schedule-name'>
                              <input type='text' defaultValue={sche.title}></input>
                              <div className='option-icon'>
                                <p className='delete' onClick={() => alert('삭제되었습니다.')}><RiDeleteBinFill></RiDeleteBinFill></p>
                              </div>
                            </div>
                          </>
                        )
                      })
                    }
                    <div className='schedule-name'>
                      <input type='text' placeholder='할일 추가하기'></input>
                    </div>

                    {/* <div className='create-schedule'>
                      <AiFillPlusCircle></AiFillPlusCircle>
                    </div> */}
                    
                    <button onClick={() => {
                      alert('저장되었습니다.')
                    }}>저장하기</button>
                  </div>
                </div>
              </div>

            </>

          }
          

        </div>
      </div>

    )
  }


}
