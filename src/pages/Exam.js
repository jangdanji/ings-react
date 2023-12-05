import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { shuffle } from 'lodash'

import { TbMessage2Question } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";


export default function Exam() {

  const navigate = useNavigate()

  const {examType} = useParams()

  const [quiz, setQuiz] = useState([''])
  const [quizData, setData] = useState([])
  const [c, setCount] = useState(0)

  // RC
  const [checkedIndex, setCheckedIndex] = useState(null)
  const [correctIndex, setCorrectIndex] = useState(null)

  // words
  const [inputWord, setInputWord] = useState('')

  const [isDone, setIsDone] = useState(false)

  useEffect( () => {

    fetch(process.env.PUBLIC_URL + '/quiz.json')
    .then((response) => response.json())
    .then((data) => {

      // 퀴즈 종류에 따라 다른 데이터를 state에 저장하기

      if (examType == 'rc') {
        setQuiz(
          shuffle(data.RC)
        )
      }
      else if (examType == 'words') {
        setQuiz(
          shuffle(data.words)
        )
      }

      setData(
        data['quiz']
      )
      
      // 초기화
      setCount(0); setIsDone(false);

    })
    .catch((error) => console.error('데이터 가져오기 실패 : ', error))

  }, [examType])

  useEffect(() => {

    if (examType == 'rc') {
      const findIdx = quiz[c].options?.findIndex(option => option === quiz[c].answer)
      setCorrectIndex(findIdx)
    }

  }, [quiz, c])


  return (
    <div className='content-wrap'>

      <div className='main-content'>

        <div className='random-quiz'>
                {[...quizData].map((quiz, index) => {
                  
                  const bg = {
                    backgroundImage: `url(\'${process.env.PUBLIC_URL + quiz.image}\')`
                  }

                  return(
                    <div key={'quiz-' + quiz.id} className='quiz' onClick={() => {

                      if (quiz.examType == 'lc') {
                        alert('준비중입니다.. 죄송합니다..')
                      } else {
                        navigate(`/exam/${quiz.examType}`)
                      }
                      
                    }}>
                      <div className='quiz-image' style={bg}>
                        
                      </div>

                      <p className='quiz-name'>{quiz.name}</p>
                      <p className='quiz-start'>시작하기</p>
                        
                    </div>
                  )
                })}
                
          </div>

        <div className='quiz-container'>

        {
          examType == 'rc' && 

          <>
            <div className='title'>
              <TbMessage2Question /> 랜덤 토익 문제 (RC)
            </div>

            <div className='question'>
              <p>
                <span>Q. </span>
                {quiz[c].question}
              </p>
            </div>

            <div className='quiz-options'>
              <ul>
                {quiz[c].options?.map((q, index) => {

                  const abcd = 'ABCD'

                  return <li className={
                    checkedIndex === index ? 'option checked' : 'option'
                  }
                  
                  onClick={() => {
                    if (!isDone) setCheckedIndex(index)
                  }}>


                    {abcd[index]}) {q}

                    {isDone === true && correctIndex == index &&
                      <span className='check' style={{display: 'flex'}}><FaCheck /></span>
                    ||
                    isDone === true && correctIndex != index &&
                      <span className='incorrect' style={{display: 'flex'}}><HiMiniXMark /></span>
                    }
                    </li>
                })}
              </ul>
            </div>

            <div className='choice-submit'>
              <p className='my-answer'>{
              isDone && checkedIndex == correctIndex && '정답입니다!! ◝(・▿・)◜'
              ||
              isDone && checkedIndex != correctIndex && '오답입니다.. ㅜㅜ'
              }</p>
              <button onClick={() => {

                if (checkedIndex === null) {
                  alert('선택해주세요!!')
                } else {
                  setIsDone(true)
                }
                
              }} style={isDone ? {display: 'none'} : {display: 'block'}}>결과 확인</button>
            </div>

            {
              isDone &&
              <>
                <div className='solution'>
                  <p className='answer'>정답 : {quiz[c].answer}</p>
                  <p className='solution-detail'>{quiz[c].solution}</p>
                </div>

                <div className='next-quiz'>
                  <button onClick={() => {
                    if (c + 1 === quiz.length) alert('더이상 문제가 없네요.. ㅠㅠ')
                    else {
                      setIsDone(false); setCount(c + 1); setCheckedIndex(null);
                    }
                    
                  }}>다음 문제</button>
                </div>
              </>
            }
          </>
        }
        {
          examType == 'words' && 

          <>
            <div className='title'>
              <TbMessage2Question /> 랜덤 토익 단어
            </div>

            <div className='question'>
              <p>
                <span>Q. </span>
                {quiz[c].definition} ({quiz[c].part_of_speech})
              </p>
            </div>

            <div className='input-words'>
              <input type='text' placeholder='단어 입력' value={inputWord} onChange={(e) => {
                if (!isDone) setInputWord(e.target.value)
              }}></input>
            </div>

            <div className='choice-submit'>
              <p className='my-answer'>{
              isDone && inputWord == quiz[c].word && <p><FaCheck style={{color: 'green', marginRight: '10px'}}/>정답입니다!! ◝(・▿・)◜</p>
              ||
              isDone && inputWord != quiz[c].word && <p><FaCheck style={{color: 'red', marginRight: '10px'}}/>오답입니다.. ㅠㅠ</p>
              }</p>
              <button onClick={() => {

                if (inputWord === '') {
                  alert('단어를 입력해주세요.')
                } else {
                  setIsDone(true)
                }
                
              }} style={isDone ? {display: 'none'} : {display: 'block'}}>결과 확인</button>
            </div>

            {
              isDone &&
              <>
                <div className='solution'>
                  <p className='answer'>정답 : {quiz[c].word}</p>
                </div>

                <div className='next-quiz'>
                  <button onClick={() => {
                    if (c + 1 === quiz.length) alert('더이상 문제가 없네요.. ㅠㅠ')
                    else {
                      setIsDone(false); setCount(c + 1); setInputWord('');
                    }
                    
                  }}>다음 문제</button>
                </div>
              </>
            }
          </>
        }

        </div>



        

      </div>

    </div>

  )
}
