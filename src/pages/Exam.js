import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { shuffle } from 'lodash'


export default function Exam() {

  const {examType} = useParams()

  console.log(examType)

  const [quiz, setQuiz] = useState(null)

  useEffect( () => {

    fetch(process.env.PUBLIC_URL + '/quiz.json')
    .then((response) => response.json())
    .then((data) => {

      let quizList
      
      if (examType == 'rc') quizList = shuffle(data.RC)
      else if (examType == 'words') quizList = shuffle(data.words)

      setQuiz(quizList)
      

    })
    .catch((error) => console.error('데이터 가져오기 실패 : ', error))

  }, [])


  return (
    <div className='content-wrap'>

      <div className='main-content'>
        {console.log(quiz)}
      </div>

    </div>

  )
}
