import { configureStore, createSlice } from '@reduxjs/toolkit'

const timeSetter = createSlice({
    name:'timeSetter',
    initialState: {
      currentTime: new Date()
    },
    reducers: {
      setTime(state, actions){
        console.log('state : ' + state)
        console.log('action : ' + new Date(actions.payload))
        return state.toString()
      }
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
    nowCategory: 0,
    nowCategoryInfo: null,
    searchWord: '',
    activePage: 1
  },
  reducers: {
    loadAllData(state, action){

          const data = action.payload[0]
          const categoryID = action.payload[1]
          const searchWord = action.payload[2]; state.searchWord = searchWord
          const option = action.payload[3]
          
          const allPosts = [...data['board']].reverse()

          const sortPosts = categoryID === '0' ? allPosts : [...data['board']].filter(post => {
            
            let optionType

            if (option === 'all') optionType = post.title + ' ' + post.content
            else if (option === 'title') optionType = post.title
            else if (option === 'content') optionType = post.content
            else if (option === 'user') optionType = post.user
            
            return (optionType).includes(searchWord) && post.category == categoryID

          }).reverse()

          const nowCategoryInfo = data['category'].find(val => val.id == categoryID)

          const newState = {
            allPosts: allPosts,
            sortPosts: sortPosts,
            nowCategory: categoryID,
            nowCategoryInfo: nowCategoryInfo,
            activePage: state.activePage
          }

          return newState

          // setPageData(data)
    
          // const searchKeyword = ''
    
          // dispatch( setBoardData(
          //   categoryID === '0' ?
          //     data['board'].filter(post => (post.title + ' ' + post.content).includes(searchKeyword)).reverse()
          //     :
          //     data['board'].filter(post => post.category == categoryID).reverse()
          // ))
  
        // dispatch( searchOption(['all', pageData['board'].reverse(), searchWord]) )

    },
    setBoardData(state, action){
      state.sortData = action.payload
    },
    resetPageNum(state, action){
      state.activePage = 1
    },
    savePageNum(state, action){
      state.activePage = action.payload
    }
  }
})

export const { setTime } = timeSetter.actions
export const { setSchedule } = mySchedule.actions
export const { loadAllData, setBoardData, searchOption, resetPageNum, savePageNum } = boardMaker.actions

export default configureStore({
    reducer:{
        timeSetter: timeSetter.reducer,
        mySchedule: mySchedule.reducer,
        boardMaker: boardMaker.reducer
    }
})