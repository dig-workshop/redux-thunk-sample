import {createSlice} from '@reduxjs/toolkit'

// ステートの型と初期値
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

// 各コンポーネントで使用するためにactionをエクスポート
export const { setReduxText } = textSlice.actions
