import {createSlice} from '@reduxjs/toolkit'

const initialState: String = ''

export const textSlice = createSlice({
    name: 'textSlice',
    initialState: initialState,
    reducers: {
        setReduxText: (_prevState, action) => {
            return action.payload
        },
    }
})

export const { setReduxText } = textSlice.actions
