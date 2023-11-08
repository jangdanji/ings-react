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

export const { setTime } = timeSetter.actions
export const { setSchedule } = mySchedule.actions

export default configureStore({
    reducer:{
        timeSetter: timeSetter.reducer,
        mySchedule: mySchedule.reducer
    }
})