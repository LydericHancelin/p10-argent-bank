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
			return { ...state, ...action.payload }
		},
		logout: (state, action) => {
			return { ...state, firstName: null, lastName: null, token: null }
		},
		setRemember: (state, action) => {
			return { ...state, remember: action.payload.remember }
		}
	},
})

export const { setUserInfos, logout, setRemember } = userSlice.actions

export const userReducer = userSlice.reducer

export const userSelector = (state) => ({ token: state.user.token, userName: `${state.user.firstName} ${state.user.lastName}`, isLogged: !!state.user.token, firstName: state.user.firstName, lastName: state.user.lastName, remember: state.user.remember, email: state.user.email, password: state.user.password })
