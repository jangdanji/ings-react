/* eslint-disable */

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserGraduate, FaCommentDots } from "react-icons/fa";
import { BsArrowReturnRight, BsFillPencilFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";

import { postDateCalculator } from './utils'

import { savePageNum } from '../redux/store';

import Loading from './Loading'

export default function post() {

  const {id} = useParams()
  const [pageData, setPageData] = useState(null)
  const [postData, setPostData] = useState(null)

  useEffect( () => {

    fetch(process.env.PUBLIC_URL + '/data.json')
    .then((response) => response.json())
    .then((data) => {

      const allData = data
      const postData = data['board'].find((post) => post.id == id)

      // 페이지에 필요한 데이터 load
      setPageData(allData)

      // 게시물 데이터
      setPostData(postData) 
      
      // 댓글 갯수 load
      let len = 0
      postData.comment.forEach(comment => len += comment.nested.length)
      len += postData.comment.length

      setCommentData({
        length: len, display: new Array(len).fill(false)
      })

    })
    .catch((error) => {
      console.error('데이터 가져오기 실패 : ', error)
    })

  }, [])

  // 댓글 쓰기 창
  const [commentData, setCommentData] = useState({
    length: 0, display: [] /* 댓글이 많으면 댓글 state가 굉장히 많아지므로 배열로 처리해야됨 */
  })

  const commentWriter = (index) => {

    let copyStates = commentData.display

    const resetDisplay = copyStates.map((val, idx) => {
      if (idx == index) {
        return !copyStates[index]
      }
      return false /* 일단 한번 전부다 false처리로 닫아야됨 (누른건 제외)*/
    })

    setCommentData({
      ...commentData, display: resetDisplay
    })

  }

  const nowDate = new Date()
  const pageNumber = useSelector((state) => state.boardMaker.activePage)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  

  if (pageData == null || postData == null) {
    return(<Loading></Loading>)
  }

  return (

    

    <div className='content-wrap'>

        <div className='main-content'>

          <div className='board-post' key={'post'+id}>

            <div className='post-head'>
              <div className='head-top'>
                <span className='post-category' onClick={() => {
                  dispatch( savePageNum(1) )
                  navigate('/board/' + postData.category)
                }}>{pageData['category'].find((gory) => gory.id == postData.category).categoryName}</span>
                <span className='post-title'>{postData.title}</span>
              </div>

              <div className='head-info'>
                <p className='user-name'><FaUserGraduate></FaUserGraduate>{postData.user}</p>
                <p>{postData.date.replace('T', ' ')}</p>
              </div>
            </div>

            <div className='post-content'>
              <p className='content-text'>{postData.content}</p>
              <div className='content-menu'>
                {/* <button className='post-copy-link'>링크복사</button> */}
                <div></div>
                <div>
                  <div className='like'>
                    <div className='like-count'>{postData.like}</div>
                    <div className='icon'>
                      <AiFillLike></AiFillLike>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='button-area'>
                    {/* <button className='post-list' onClick={() => navigate('/board/' + postData.category)}>목록</button> */}
                    <button className='post-report' onClick={() => alert('신고 접수 완료')}>신고</button>
                  </div>
                </div>



              </div>

            </div>

            <div className='comment-area'>
              <p className='comment-length'>댓글 {commentData.length}개</p>
              <div className='comment-wrap'>
                {postData.comment.map((c, index) => {
                  return (
                    <div className='comment'>

                      <div className='comment-info'>
                        <div className='metadata'>
                          <div className='user-name'><FaUserGraduate></FaUserGraduate>{c.user}</div>
                          <div className='date'>{postDateCalculator(c.date, nowDate)}</div>
                        </div>
                        <div className='option'>
                          <div className='reply' onClick={ () => commentWriter(index) }><FaCommentDots></FaCommentDots> 대댓글</div>
                        </div>

                      </div>
                      <div className='comment-text'>{c.text}</div>
                      {
                        commentData.display[index] &&
                        <div className='reply-area'>
                          <textarea type='textarea'></textarea>
                          <div className='submit'>
                              <button>작성하기</button>
                          </div>
                        </div>
                      }

                      {c.nested.map((n, nestIndex) => {
                        return(
                        <div className='nested-comment'>
                          <div className='comment-info'>
                            <div className='metadata'>
                                <div className='user-name'><BsArrowReturnRight></BsArrowReturnRight> <FaUserGraduate></FaUserGraduate> {n.user}</div>
                                <div className='date'>{postDateCalculator(n.date, nowDate)}</div>
                            </div>
                            <div className='option'>
                              {/* index+nestIndex+1가 댓글 index임  */}
                              <div className='reply' onClick={ () => commentWriter(index+nestIndex+1) }><FaCommentDots></FaCommentDots> 대댓글</div>
                            </div>
                          </div>
                          <div className='comment-text'><span className='target-user'>@{n.target}</span> {n.text}</div>
                          {
                            commentData.display[index+nestIndex+1] && 
                            <div className='reply-area'>
                              <textarea type='textarea'></textarea>
                              <div className='submit'>
                                  <button>작성하기</button>
                              </div>
                            </div>
                          }
                        </div>
                        )
                      })}

                    </div>
                  )
                })}
              </div>
              <div className='comment-write'>
                <p className='comment-write-title'><BsFillPencilFill></BsFillPencilFill> 댓글 작성하기</p>
                <div className='comment-write-wrap'>
                  <textarea type='textarea'></textarea>
                  <button>등록</button>
                </div>

              </div>
            </div>

          </div>

        </div>

        

    </div>

  )
}
