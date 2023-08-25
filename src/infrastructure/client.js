const baseUrl = "http://localhost:3001/api/v1";

export const getToken = (userEmail, userPwd) => {
	return fetch(baseUrl + "/user/login",
		{
			headers: {
				'Content-Type': 'application/json',
			},
			method: "POST",
			body: `{"email": "${userEmail}", "password": "${userPwd}"}`
		}
	)
}

export const getUser = ({ token }) => {
	return fetch(baseUrl + "/user/profile",
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			method: "POST",
		}
	)
}

export const putUser = ({ token, user }) => {
	return fetch(baseUrl + "/user/profile",
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			method: "PUT",
			body: `{
				"firstName": "${user.firstName}",
				"lastName": "${user.lastName}"
			}`
		}
	)
}