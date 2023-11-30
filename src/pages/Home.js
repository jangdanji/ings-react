/* eslint-disable */

import React, { useEffect, useState, setState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route, useNavigate } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import { postDateCalculator } from './utils'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { BiSolidBookReader } from "react-icons/bi";

import { savePageNum, setLoginStatus } from '../redux/store';

import Loading from './Loading'

function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [pageData, setPageData] = useState(null)

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data.json')
    .then((response) => response.json())
    .then((data) => {
      
      setPageData(data)
    })
    .catch((error) => console.log(error))

  })

  const nowDate = new Date()

  // const isLogin = useSelector((state) => state.userState.loginStatus)
  // const loginUser = useSelector((state) => )

  const { isLogin, loginUser } = useSelector((state) => ({
    isLogin: state.userState.loginStatus,
    loginUser: state.userState.loginData
  }))


  // 노션 데이터베이스 api는 cors때문에 안되므로 jsonbin으로 옮겨야 할듯

  if (pageData == null) {
    return (<Loading></Loading>)
  }

  return (
    <div className='content-wrap'>

        <div className='main-content'>

            <div className='slider-home'>
                <Swiper modules={[Navigation, Pagination]} slidesPerView={1} navigation={true} loop={true}
                  
                  pagination={{
                    clickable: true,
                    renderBullet: function (index) {return '<span class="swiper-pagination-bullet">' + pageData['swiper'][index].name + '</span>'}}}
                >
                {
                    pageData['swiper'].map((data, i) => {
                    return (
                        <SwiperSlide>
                          <img src={process.env.PUBLIC_URL + data.image} alt={'swiper-img-' + data.id}></img>
                        </SwiperSlide>
                    )
                    })
                }
                </Swiper>
            </div>

            <div className='board-home'>
              {
                pageData['category'].slice(1, 5).map((data) => {
                  return(
                      <div className='board' key={'board-' + data.id}>
                           <div className='board-title' onClick={ () => {navigate(`/board/${data.id}/?searchWord=&searchOption=all`); dispatch( savePageNum(1) )
                            }}>
                             <p>{data.categoryName}</p>
                           </div>
                           <div className='board-content'>
                             <ul>
                               {
                                pageData['board'].filter((post) => post.category == data.id).slice(-10).reverse().map((p) => {
                                  return(
                                    <li key={'post' + p.id}>
                                      <p className='post-title' onClick={ () => {navigate(`/post/${p.id}`); dispatch( savePageNum(1) ) }}>{p.title}</p>
                                      <p className='post-date'>{
                                        postDateCalculator(p.date, nowDate)
                                      }</p>
                                    </li>
                                  )
                                })
                               }
                             </ul>
                           </div>
                      </div>
                  )
                })
              }

            </div>

            <div className='random-quiz'>
              {[...pageData['quiz']].map((quiz) => {

                const url = quiz.image

                const bg = {
                  backgroundImage: `url(${url})`
                }

                return(
                  <div key={'quiz-' + quiz.id} className='quiz'>
                    <div className='quiz-image' style={bg}>
                      
                    </div>

                    <p className='quiz-name'>{quiz.name}</p>
                    <p className='quiz-start'>시작하기</p>
                      
                    
                  </div>
                )
              })}
              
            </div>

            <div className='board-home'>
            {
              pageData['category'].slice(5, 9).map((data) => {
                return(
                    <div className='board' key={'board-' + data.id}>
                        <div className='board-title' onClick={ () => navigate(`/board/${data.id}/?searchWord=&searchOption=all`) }>
                          <p>{data.categoryName}</p>
                        </div>
                        <div className='board-content'>
                          <ul>
                            {
                              pageData['board'].filter((post) => post.category == data.id).slice(-10).reverse().map((p) => {
                                return(
                                  <li key={'post' + p.id}>
                                    <p className='post-title' onClick={ () => navigate(`/post/${p.id}`)}>{p.title}</p>
                                    <p className='post-date'>{
                                      postDateCalculator(p.date, nowDate)
                                    }</p>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </div>
                    </div>
                )
              })
            }
            </div>

        </div>

        <div className='side-content'>

            <div className='my-page'>
              {
                !isLogin &&
                <>
                  <p className='message-box'>로그인하셔서 더 많은 컨텐츠를 누리세요!</p>
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

            <div className='d-day'>
              <ul>
                <p className='d-day-title'>토익시험 일정안내</p>
                {
                  pageData['schedule'].map((d) => {

                    const ddayCalcul = Math.floor((new Date(d.date) - nowDate) / (1000 * 60 * 60 * 24))

                    if (ddayCalcul > 0) { /* 디데이 지났으면 렌더링안함 */
                      return ( 
                        <li className='d-day-content'>
                          <div className='toeic-schedule'>
                            <span className='toeic-date'>{/[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(d.date)} </span>
                            <span className='toeic-dday'>(D-{ddayCalcul == 0 ? 'DAY' : ddayCalcul})</span>
                            <p className='toeic-deadline-date'>접수 마감 : {/[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(d.deadline)}</p>
                            {/* <p className='toeic-result-date'>성적 발표 : {/[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(d.result_date)}</p> */}
                          </div>
                          <div className='schedule-detail'>
                            <p>접수하기</p>
                          </div>
                        </li>
                      )
                    }

                  })
                }

                <p className='show-more' onClick={ () => navigate('/calendar')}>일정 더보기</p>
                
              </ul>
            </div>

        </div>

    </div>


  )
}

export default Home