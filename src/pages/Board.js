/* eslint-disable */

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { FaClipboardList } from "react-icons/fa";
import { BiSolidChevronRight, BiSolidChevronsRight, BiSolidChevronLeft, BiSolidChevronsLeft } from "react-icons/bi";

import { boardDateCalculator, postDateCalculator } from './utils'

import Loading from './Loading'

export default function Board() {

  const { categoryID } = useParams()

  const navigate = useNavigate()

  const [pageData, setPageData] = useState(null) /* 모든 데이터 */
  const [boardData, setBoardData] = useState([]) /* 현재 카테고리의 게시판 데이터 */
  const [activePage, setActivePage] = useState(1) /* 페이지네이션 기본값 1페이지 */
  const [viewUnit] = useState(15) /* 페이지당 몇개 게시글 보여줄건지 */

  const nowDate = useSelector((state) => state.timeSetter.currentTime) /* 현재 날짜 */

  function pageLogic(number, postLength){

    /* 선택한 페이지 숫자에 따라서 페이지네이션 첫 숫자를 정하는 로직 */

    if (number < 4) { /* 4페이지보다 작으면 1부터 ~ */
      return 1
    } else if (postLength - number < 3) { /* 남은 페이지가 별로없으면 (본인포함 2개밖에 안남으면) 마지막 5개만 띄우기 */
      return postLength - 4
    } else {
      return number - 2 /* -2 번째 부터 쫘라락 뽑기 (선택한 숫자가 가운데로 오게) */
    }
  }

  useEffect( () => {

    fetch(process.env.PUBLIC_URL + '/data.json')
    .then((response) => response.json())
    .then((data) => {

      // 페이지에 필요한 데이터 load
      const nowCategory = data['board'].filter(post => post.category == categoryID).reverse()

      setPageData(data)
      setBoardData(nowCategory)

    })
    .catch((error) => console.error('데이터 가져오기 실패 : ', error))

  }, [])

  if (pageData == null) {

    return (<Loading></Loading>)

  } else {

    const totalPages = Math.ceil(boardData.length / viewUnit)
    const categoryInfo = pageData['category'].find(val => val.id == categoryID)
    const top5posts = boardData.slice().sort((a, b) => b.like - a.like).slice(0, 5)

    return (
      <div className='content-wrap'>

        <div className='main-content'>
  
          <div className='board'>

            <div className='category-head'>

              <div className='icon'><FaClipboardList></FaClipboardList></div>
    
              <div className='info'>

                <div className='title'>{ categoryInfo.categoryName }</div>
                <div className='intro'>{ categoryInfo.intro }</div>

              </div>

            </div>

            <div className='post-container'>
              <ul className='sort'>
                <li>번호</li>
                <li>제목</li>
                <li>날짜</li>
                <li>닉네임</li>
                <li>추천</li>
              </ul>
              { 
                /* 활성 페이지-1 곱하기 보기갯수단위부터 ~ + 단위  */
                boardData.slice((activePage - 1) * viewUnit, (activePage - 1) * viewUnit + viewUnit).map((post, index) => {

                  const number = boardData.length - (activePage - 1) * viewUnit - index

                  return(
                    <ul className='post' onClick={() => navigate(`/post/${post.id}`)}>
                      <li className='number'>{number}</li>
                      <li className='title'>{post.title}</li>
                      <li className='date'>{boardDateCalculator(post.date, nowDate)}</li>
                      <li className='user'>{post.user}</li>
                      <li className='like'>{post.like}</li>
                      
                    </ul>
                  )
                })
              }
            </div>

            <div className='pagination-wrap'>
              <ul>

              {
              activePage > 3 && totalPages > 5 && /* 활성 페이지네이션이 4 이상이라면 "<< 버튼"  */
              <>
                <li className='start' onClick={ () => setActivePage(1)}><BiSolidChevronsLeft></BiSolidChevronsLeft></li>
                <li className='prev' onClick={ () => {
                  setActivePage(activePage - 5 <= 0 ? 1 : activePage - 5) /* ex 4페이지인데 -5를 해버리면 안되니까 1로 가게하기위함 */
                }}>
                  <BiSolidChevronLeft></BiSolidChevronLeft>
                </li>
              </>

              }
              
              {
                /* Math.min(5, totalPages) : 5개도 안나오면 그냥 있는걸로만 (둘중에 적은걸로 고름) */

                Array.from(Array(Math.min(5, totalPages)), (x, index) => {

                  const pageNum = pageLogic(activePage, totalPages) + index /* 페이지 숫자 몇번부터 나열할건지? */

                  return(
                    <li className='page-button' onClick={ () => setActivePage(pageNum)}>
                      <span className={`page-number ${pageNum == activePage ? 'active' : ''}`}>{pageNum}</span> {/* active 상태는 클래스명 따로 주기 */}
                    </li>
                  )
                })
              }

              {
              /* 남은 페이지가 2개 넘게 남았으면 "> >> 버튼" 활성화 */
                activePage < totalPages - 2 && totalPages > 5 &&
                <>
                  <li className='next' onClick={ () => {
                    setActivePage( activePage + 5 < totalPages ? activePage + 5 : totalPages)} /* totalPage가 10인데 현재 page가  7일때 +5를 하면 에러나니까 */}>
                      <BiSolidChevronRight></BiSolidChevronRight>
                  </li>
                  <li className='end' onClick={ () => setActivePage(totalPages)}><BiSolidChevronsRight></BiSolidChevronsRight></li>
                </>
              }


              </ul>
            </div>
          </div>
        </div>

        <div className='side-content'>
          <div className='hot-posts'>
              <h4 className='title'>게시판 인기 게시글</h4>
              <ul className='hot-posts-wrap'>
                {
                  top5posts.map((post) => {
                    return(
                      <li className='hot-post' onClick={ () => { navigate(`/post/${post.id}`)}}>
                        <>
                          <p className='hot-post-title'>{post.title}</p>
                          <p className='hot-post-date'>{postDateCalculator(post.date, nowDate)}</p>
                        </>
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
}
