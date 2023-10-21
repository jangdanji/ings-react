/* eslint-disable */

import React, { useEffect, useState, setState } from 'react'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function Home() {

  const navigate = useNavigate()
  
  // const [quizList, setQuizList] = useState([])
  // const [board, setBoard] = useState([])
  // const [swipers, setSwipers] = useState([])
  // const [dday, setDday] = useState([])
  // const [category, setCategory] = useState([])

  const [pageData, setPageData] = useState(null)

  useState(() => {

    fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      setPageData(data)
    })
    .catch((error) => console.log(error))

  })

  
  const nowDate = useSelector((state) => state.timeSetter.currentTime)

  // 노션 데이터베이스 api는 cors때문에 안되므로 jsonbin으로 옮겨야 할듯

  function postDateCalculator(postDate, nowDate) {

    let timeDiff = nowDate - new Date(postDate);

    const minutesDiff = Math.floor(timeDiff / (1000 * 60))
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60))
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const monthsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30)) // 월 단위 계산

    // 적절한 형식의 문자열 생성
    let timeAgo = ''

    if (minutesDiff < 1) {
        timeAgo = '방금 전'
    } else if (minutesDiff < 60) {
        timeAgo = `${minutesDiff}분 전`
    } else if (hoursDiff < 24) {
        timeAgo = `${hoursDiff}시간 전`
    } else if (daysDiff < 30) {
        timeAgo = `${daysDiff}일 전`
    } else {
        timeAgo = `${monthsDiff}개월 전`
    }

    return timeAgo
}

  if (pageData == null) {
    return (<div>로딩중..</div>)
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
                pageData['category'].slice(0, 4).map((data) => {
                  return(
                      <div className='board' key={'board-' + data.id}>
                           <div className='board-title'>
                             <p>{data.categoryName}</p>
                           </div>
                           <div className='board-content'>
                             <ul>
                               {
                                pageData['board'].filter((post) => post.category == data.id).slice(-10).reverse().map((p) => {
                                  return(
                                    <li key={'post' + p.id}>
                                      <p className='post-title' onClick={ () => navigate(`/board/${p.id}`)}>{p.title}</p>
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
              {pageData['quiz'].map((quiz) => {

                const bg = {
                  backgroundImage: `url(${quiz.image})`
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
              pageData['category'].slice(4, 8).map((data) => {
                return(
                    <div className='board' key={'board-' + data.id}>
                        <div className='board-title'>
                          <p>{data.categoryName}</p>
                        </div>
                        <div className='board-content'>
                          <ul>
                            {
                              pageData['board'].filter((post) => post.category == data.id).slice(-10).reverse().map((p) => {
                                return(
                                  <li key={'post' + p.id}>
                                    <p className='post-title' onClick={ () => navigate(`/board/${p.id}`)}>{p.title}</p>
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
              <p className='canyoujoinus'>로그인하셔서 더 많은 컨텐츠를 누리세요!</p>
              <div className='login'>
                (사이트) 로그인
              </div>
              <div className='login-options'>
                <ul>
                  <li>회원가입</li>
                  <li>계정찾기</li>
                </ul>
              </div>
            </div>
            <div className='d-day'>
              <ul>
                <p className='d-day-title'>시험일정안내</p>
                {
                  pageData['dday'].map((d) => {
                    return (
                      <li className='d-day-content'>
                        <div className='schedule'>
                          <span className='toeic-date'>{/[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(d.date)} </span>
                          <span className='toeic-dday'>(D-{Math.floor((new Date(d.date) - nowDate) / (1000 * 60 * 60 * 24))})</span>
                          <p className='toeic-deadline-date'>접수 마감 : {/[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(d.deadline)}</p>
                          <p className='toeic-result-date'>성적 발표 : {/[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(d.result_date)}</p>
                        </div>
                        <div className='schedule-detail'>
                          <p>접수하기</p>
                          <p>자세히보기</p>
                        </div>
                      </li>
                    )
                  })
                }
                
              </ul>
            </div>

        </div>

    </div>


  )
}

export default Home