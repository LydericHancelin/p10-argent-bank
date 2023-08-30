import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	token: null,
	firstName: null,
	lastName: null,
	remember: false,
	email: null,
	password: null,
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserInfos: (state, action) => {
			state.firstName = action.payload.firstName
			state.lastName = action.payload.lastName
			state.email = action.payload.email
			state.password = action.payload.password
			state.token = action.payload.token
		},
		logout: (state, action) => {
			state.firstName = null
			state.lastName = null
			state.token = null
		},
		setRemember: (state, action) => {
			console.log("rememberAction")
			state.remember = true
		}
	},
})

export const { setUserInfos, logout, setRemember } = userSlice.actions

export const userReducer = userSlice.reducer

export const userSelector = (state) => ({ token: state.user.token, userName: `${state.user.firstName} ${state.user.lastName}`, isLogged: !!state.user.token, firstName: state.user.firstName, lastName: state.user.lastName, remember: state.user.remember, email: state.user.email, password: state.user.password })
