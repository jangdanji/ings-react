/* eslint-disable */

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { FaClipboardList } from "react-icons/fa";
import { BiSolidChevronRight, BiSolidChevronsRight, BiSolidChevronLeft, BiSolidChevronsLeft } from "react-icons/bi";

import { boardDateCalculator, postDateCalculator } from './utils'

import { loadAllData, savePageNum } from '../redux/store';

import Loading from './Loading'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function Board() {

  /* url로 받는 파라미터들 */

  const { categoryID } = useParams()

  const query = useQuery()
  const searchWord = query.get("searchWord") !== null ? query.get("searchWord") : ''
  const searchOption = query.get("searchOption") !== null ? query.get("searchOption") : 'all'

  /* navigate, dispatch */

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [viewUnit] = useState(15) /* 페이지당 몇개 게시글 보여줄건지 */

  const [inputValue, setinputValue] = useState('') /* 검색 단어 (input이 onchange될때마다 여기에 담겨짐) */
  const [nowSelectValue, setSelectValue] = useState('all') /* 검색 타입 */

  const nowDate = useSelector((state) => state.timeSetter.currentTime) /* 현재 날짜 */

  const activePage = useSelector(state => state.boardMaker.activePage) /* 현재 활성화 된 페이지 */

  const [categoryInfo, loadCategoryInfo] = useState({}) /* 카테고리 정보 */

  const { allPosts, sortPosts } = useSelector((state) => ({ /* 메인 데이터 */
    allPosts: state.boardMaker.allPosts,
    sortPosts: state.boardMaker.sortPosts,
  }))

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

      console.log('데이터 로딩')

      /* searchWord는 board 들어올때마다 '' 로 초기화됨 (상단 useState) */
      /* nowSelectValue : 전체검색 all, 제목 검색 title, 내용 검색 content, 작성자 검색 user */

      // dispatch( savePageNum(1) )

      dispatch( loadAllData(
        [data['board'],
        categoryID,
        searchWord, /* url에 담김 */
        searchOption /* url에 담김 */
      ]) )

      loadCategoryInfo(data['category'][categoryID]) /* 카테고리 번호가 여기 index에 드감 */

    })
    .catch((error) => console.error('데이터 가져오기 실패 : ', error))

  }, [categoryID, searchWord, searchOption])


  if (allPosts.length === 0) {

    return (<Loading></Loading>)

  } else {

    const totalPages = Math.ceil(sortPosts.length / viewUnit)

    const targetCategory = categoryID === '0' ?
              allPosts : allPosts.filter((post) => categoryID == post.category)

    const top5posts = [...targetCategory].sort((a, b) => b.like - a.like).slice(0, 5) 

    return (
      <div className='content-wrap'>

        <div className='main-content'>
  
          <div className='board'>

            <div className='category-head'>

              <div className='icon'><FaClipboardList></FaClipboardList></div>
    
              <div className='info' onClick={ () => {
                navigate(`/board/${categoryID}/?searchWord=&searchOption=all`)
                dispatch( savePageNum(1) )
              }}>

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
                sortPosts.slice((activePage - 1) * viewUnit, (activePage - 1) * viewUnit + viewUnit).map((post, index) => {

                  const number = sortPosts.length - (activePage - 1) * viewUnit - index

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
                <li className='start' onClick={ () => {
                  dispatch( savePageNum(1) )
                }}>
                  <BiSolidChevronsLeft></BiSolidChevronsLeft></li>

                <li className='prev' onClick={ () => {

                  const prevClicked = activePage - 5 <= 0 ? 1 : activePage - 5

                  dispatch( savePageNum(prevClicked) ) /* ex 4페이지인데 -5를 해버리면 안되니까 1로 가게하기위함 */
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
                    <li className='page-button' onClick={ () => {
                      dispatch( savePageNum(pageNum) )
                    }}>
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

                    const pageNum = activePage + 5 < totalPages ? activePage + 5 : totalPages

                    dispatch( savePageNum(pageNum) )} /* totalPage가 10인데 현재 page가  7일때 +5를 하면 에러나니까 */}>
                      <BiSolidChevronRight></BiSolidChevronRight>
                  </li>
                  <li className='end' onClick={ () => {
                    dispatch( savePageNum(totalPages) )
                  }}><BiSolidChevronsRight></BiSolidChevronsRight></li>
                </>
              }


              </ul>
            </div>

            <div className='board-search'>
              <div className='board-search-wrap'>
                <select onChange={(event) => setSelectValue(event.target.value)}>
                  <option value='all'>제목+내용</option>
                  <option value='title'>제목</option>
                  <option value='content'>내용</option>
                  <option value='user'>작성자</option>
                </select>
                <input onChange={(event) => setinputValue(event.target.value)} type='text'></input>
                <button onClick={() => {

                    console.log(inputValue.length >= 2);

                    if (inputValue.length >= 2) {
                      navigate(`/board/${categoryID}/?searchWord=${inputValue}&searchOption=${nowSelectValue}`);
                    } else {
                      alert('검색어를 2글자 이상 입력해주세요.')
                    }

                }}>검색</button>
              </div>
            </div>
          </div>
        </div>

        <div className='side-content'>
          <div className='hot-posts'>
              <h4 className='title'>인기 게시글</h4>
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
