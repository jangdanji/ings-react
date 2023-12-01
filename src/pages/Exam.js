import React, { useEffect } from 'react'

export default function Exam() {

  useEffect( () => {

    fetch(process.env.PUBLIC_URL + '/quiz.json')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)


    })
    .catch((error) => console.error('데이터 가져오기 실패 : ', error))

  }, [])


  return (
    <div className='content-wrap'>

      <div className='main-content'>

      </div>

    </div>

  )
}
