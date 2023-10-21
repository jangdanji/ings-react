/* eslint-disable */

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Board() {

  const {id} = useParams()
  const [pageData, setPageData] = useState(null)
  const [postData, setPostData] = useState(null)

  useEffect( () => {

    fetch(process.env.PUBLIC_URL + '/data.json')
    .then((response) => response.json())
    .then((data) =>{

      setPageData(data)
      setPostData(data['board'].find((post) => post.id == id))
      
      console.log(data['board'].find((post) => post.id == id))
      

    })
    .catch((error) => {
      console.error('데이터 가져오기 실패 : ', error)
    })

  }, [])

  if (pageData == null || postData == null) {
    return(
      <div>로딩중..</div>
    )
  }
  return (
    <div className='content-wrap'>

        <div className='main-content'>

          <div className='board-post' key={'post'+id}>

            <div className='post-head'>
              <span className='post-category'>{pageData['category'].find((gory) => gory.id == postData.category).categoryName}</span>
              <span className='post-title'>{postData.title}</span>
              <div className='head-wrap'>
                <p>{postData.date}</p>
                <p>{postData.user}</p>
              </div>
            </div>

            <div className='post-content'>
              <p>{postData.content}</p>
            </div>

            <div className='comment-area'>
              <p className='comment-length'>댓글 {postData.comment.length}개</p>
              <div className='comment-wrap'>
                {postData.comment.map((c) => {
                  return (
                    <div className='comment'>
                      <p>{c}</p>
                    </div>
                  )
                })}
              </div>
              <div className='comment-write'>
                <input type='textarea'></input>
              </div>
            </div>

          </div>

        </div>

    </div>

  )
}
