import { configureStore, createSlice } from '@reduxjs/toolkit'

const userState = createSlice({
  name: 'userState',
  initialState: {
    loginStatus: false,
    loginData: {}
  },
  reducers: {
    setLoginStatus(state, action){

      const loginStatus = action.payload[0]
      const loginData = action.payload[1]

      return {
        loginStatus: loginStatus,
        loginData: loginData
      }
      
    }
  }
})

const timeSetter = createSlice({
    name:'timeSetter',
    initialState: {
      currentTime: new Date()
    },
    reducers: {
      // setTime(state, actions){
      //   console.log('state : ' + state)
      //   console.log('action : ' + new Date(actions.payload))
      //   return state.toString()
      // }
    }
  })

  const mySchedule = createSlice({
    name: 'mySchedule',
    initialState: null,
    reducers: {
      setSchedule(state, action){

      }
    }
  })

const boardMaker = createSlice({
  name: 'boardMaker',
  initialState: {
    allPosts: [],
    sortPosts: [],
    activePage: 1
  },
  reducers: {
    loadAllData(state, action){

          const data = action.payload[0]
          const categoryID = action.payload[1]
          const searchWord = action.payload[2]
          const option = action.payload[3]

          /* 이러는 이유 : 메인화면에서 전체게시글 검색하면 데이터가 통 json (원래 요구하던거) 이 아니라 state에 있는 allPosts를 사용해서 loadAllData를 불러옴  */
          const allPosts = [...data].reverse()

          const sortPosts = [...allPosts].filter(post => {
            
            let optionType = ''

            if (option === 'all') optionType = post.title + ' ' + post.content
            else if (option === 'title') optionType = post.title
            else if (option === 'content') optionType = post.content
            else if (option === 'user') optionType = post.user
            
            if (categoryID === '0') {
              return (optionType).includes(searchWord)
            } else {
              return (optionType).includes(searchWord) && post.category.toString() === categoryID
            }
            
          }).reverse()

          const newState = {
            allPosts: allPosts,
            sortPosts: sortPosts,
            activePage: state.activePage
          }

          console.log(newState)

          return newState

    },
    savePageNum(state, action){
      state.activePage = action.payload
    }
  }
})

export const { setLoginStatus } = userState.actions
export const { setTime } = timeSetter.actions
export const { setSchedule } = mySchedule.actions
export const { loadAllData, savePageNum } = boardMaker.actions

export default configureStore({
    reducer:{
        userState: userState.reducer,
        timeSetter: timeSetter.reducer,
        mySchedule: mySchedule.reducer,
        boardMaker: boardMaker.reducer
    }
})