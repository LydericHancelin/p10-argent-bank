import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	token: null,
	firstName: null,
	lastName: null
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserInfos: (state, action) => {
			state.firstName = action.payload.firstName
			state.lastName = action.payload.lastName
			state.token = action.payload.token
		},
		logout: (state, action) => {
			state.firstName = null
			state.lastName = null
			state.token = null
		}
	},
})

export const { setUserInfos, logout } = userSlice.actions

export const userReducer = userSlice.reducer

export const userSelector = (state) => ({ token: state.user.token, userName: `${state.user.firstName} ${state.user.lastName}`, isLogged: !!state.user.token, firstName: state.user.firstName, lastName: state.user.lastName })
