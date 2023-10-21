/* eslint-disable */

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Board() {

  const {id} = useParams()
  const [postData, setPostData] = useState()

  useEffect( () => {

    fetch(process.env.PUBLIC_URL + '/data.json')
    .then((response) => response.json())
    .then((data) =>{

      setPostData(
        data['board'].find((post) => post.id == id)
      )

    })
    .catch((error) => {
      console.error('데이터 가져오기 실패 : ', error)
    })

  }, [])


  return (
    <div className='board-post' key={'post'+id}>
      <div className='post-category'>{}</div>
    </div>
  )
}
