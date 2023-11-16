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
    searchPosts: [],
    searchWord: '',
    activePage: 1
  },
  reducers: {
    loadAllData(state, action){

          const data = action.payload[0]
          const categoryID = action.payload[1]
          
          const allPosts = [...data['board']].reverse()
          const sortPosts = categoryID === '0' ? allPosts : [...data['board']].filter(post => post.category == categoryID).reverse()
          const nowCategoryInfo = data['category'].find(val => val.id == categoryID)

          const newState = {
            allPosts: allPosts,
            sortPosts: sortPosts,
            nowCategory: categoryID,
            nowCategoryInfo: nowCategoryInfo,
            searchWord: state.searchWord,
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
    searchOption(state, action){

      const [ option, keyword ] = action.payload

      state.searchWord = keyword === '' ? '' : keyword

      state.activePage = 1

      state.searchPosts = [...state.sortPosts].filter( (d) => {

        // console.log(d.title)

        let optionType = ''

        if (option === 'all') optionType = d.title + ' ' + d.content
        else if (option === 'title') optionType = d.title
        else if (option === 'content') optionType = d.content
        else if (option === 'user') optionType = d.user

        return optionType.includes(keyword)

      })
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