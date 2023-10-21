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
  
  const [quizList, setQuizList] = useState([])
  const [board, setBoard] = useState([])
  const [swipers, setSwipers] = useState([])
  const [dday, setDday] = useState([])

        // const quizListdata = data['quiz']
        // const board = data['board']
        // const swipers = data['swiper']
        // const dday = data['dday']
        // setQuizList(quizListdata)
        // setBoard(board)
        // setSwipers(swipers)
        // setDday(dday)
  


  useEffect(() => {


    // const express = require("express");
    // const Client = require("@notionhq/client").Client;
    // const NOTION_DB_ID = "7660a26510c744af9a52a6669ee53bd9"
    // const NOTION_API_KEY = 'secret_sZg3wfIvJuNLD5UVIZcHu5YXVWuY9RffdY5S2JB4XVz'

    // const notion = new Client({ auth: NOTION_API_KEY });

    // const getNotionApi = async () => {
    //   const notionData = await notion.databases.query({
    //     database_id: NOTION_DB_ID,
    //   });
    //   console.log(notionData.results);
    //   return notionData.results;
    // }

    // const app = express();
    // app.set("port", 3000);

    // app.use("/", async (req, res) => {
    //   try {
    //     const notionData = await getNotionApi();
    //     res.send(notionData);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // });
    
    // app.listen(app.get("port"), () => {
    //   console.log("Notion API 서버 실행");
    // });


  
  }, [])

  const [categoryData] = useState([
    {id: 1, categoryName: "질문하기"},
    {id: 2, categoryName: "학습자료 요청/공유"},
    {id: 3, categoryName: "스터디 모집"},
    {id: 4, categoryName: "중고거래"},
    {id: 5, categoryName: "수강 후기"},
    {id: 6, categoryName: "모의고사"},
    {id: 7, categoryName: "자유게시판"},
    {id: 8, categoryName: "입시자료"},
  ])

  const state = useSelector((state) => state.timeSetter);

  function postDateCalculator(postDate, nowDate) {

    let timeDiff = nowDate - new Date(postDate);

    console.log(timeDiff)

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

    return timeAgo;
}


  return (

    <div></div>
    
      // <div className='content'>
      //   <div className='content-wrap'>
      //     <div className='main-content'>
      //       <div className='slider-home'>
      //           <Swiper modules={[Navigation, Pagination]} slidesPerView={1} navigation={true} loop={true}
                  
      //             pagination={{
      //               clickable: true,
      //               renderBullet: function (index) {return '<span class="swiper-pagination-bullet">' + swipers[index].name + '</span>'}}}
      //           >
      //           {
      //               swipers.map((data, i) => {
      //               return (
      //                   <SwiperSlide key={i}>
      //                     <img src={process.env.PUBLIC_URL + data.image} alt={'swiper-img-' + data.id}></img>
      //                   </SwiperSlide>
      //               )
      //               })
      //           }
      //           </Swiper>
      //       </div>

      //       <div className='board-home'>
      //         {

      //           categoryData.slice(0, 4).map((data) => {
      //             return(
      //                 <div className='board' key={'board-' + data.id}>
      //                      <div className='board-title'>
      //                        <p>{data.categoryName}</p>
      //                      </div>
      //                      <div className='board-content'>
      //                        <ul>
      //                          {
      //                           board.filter((post) => post.category == data.id).slice(-10).reverse().map((p) => {
      //                             return(
      //                               <li key={'post' + p.id}>
      //                                 <p className='post-title' onClick={ () => navigate(`/board/${p.id}`)}>{p.title}</p>
      //                                 <p className='post-date'>{
      //                                   postDateCalculator(p.date, state)
      //                                 }</p>
      //                               </li>
      //                             )
      //                           })
      //                          }
      //                        </ul>
      //                      </div>
      //                 </div>
      //             )
      //           })
      //         }

      //       </div>

      //       <div className='random-quiz'>
      //         {quizList.map((quiz) => {

      //           const bg = {
      //             backgroundImage: `url(${quiz.image})`
      //           }

      //           return(
      //             <div key={'quiz-' + quiz.id} className='quiz'>
      //               <div className='quiz-image' style={bg}>
                      
      //               </div>

      //               <p className='quiz-name'>{quiz.name}</p>
      //               <p className='quiz-start'>시작하기</p>
                      
                    
      //             </div>
      //           )
      //         })}
              
      //       </div>

      //       <div className='board-home'>
      //       {
      //         categoryData.slice(4, 8).map((data) => {
      //           return(
      //               <div className='board' key={'board-' + data.id}>
      //                   <div className='board-title'>
      //                     <p>{data.categoryName}</p>
      //                   </div>
      //                   <div className='board-content'>
      //                     <ul>
      //                       {
      //                         board.filter((post) => post.category == data.id).slice(-10).reverse().map((p) => {
      //                           return(
      //                             <li key={'post' + p.id}>
      //                               <p className='post-title' onClick={ () => navigate(`/board/${p.id}`)}>{p.title}</p>
      //                               <p className='post-date'>{
      //                                 postDateCalculator(p.date, state)
      //                               }</p>
      //                             </li>
      //                           )
      //                         })
      //                       }
      //                     </ul>
      //                   </div>
      //               </div>
      //           )
      //         })
      //       }
      //       </div>

      //     </div>
      //     <div className='side-content'>
      //       <div className='my-page'>
      //         <p className='canyoujoinus'>로그인하셔서 더 많은 컨텐츠를 누리세요!</p>
      //         <div className='login'>
      //           (사이트) 로그인
      //         </div>
      //         <div className='login-options'>
      //           <ul>
      //             <li>회원가입</li>
      //             <li>계정찾기</li>
      //           </ul>
      //         </div>
      //       </div>
      //       <div className='d-day'>
      //         <ul>
      //           <p className='d-day-title'>시험일정안내</p>
      //           {
      //             dday.map((d) => {
      //               return (
      //                 <li className='d-day-content'>
      //                   <div className='schedule'>
      //                     <span className='toeic-date'>{/[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(d.date)} </span>
      //                     <span className='toeic-dday'>(D-{Math.floor((new Date(d.date) - state) / (1000 * 60 * 60 * 24))})</span>
      //                     <p className='toeic-deadline-date'>접수 마감 : {/[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(d.deadline)}</p>
      //                     <p className='toeic-result-date'>성적 발표 : {/[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(d.result_date)}</p>
      //                   </div>
      //                   <div className='schedule-detail'>
      //                     <p>접수하기</p>
      //                     <p>자세히보기</p>
      //                   </div>
      //                 </li>
      //               )
      //             })
      //           }
                
      //         </ul>
      //       </div>
      //     </div>
      //   </div>
      // </div>

  )
}

export default Home