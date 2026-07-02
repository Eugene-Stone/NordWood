const BASE_URL = 'http://localhost:1337';



export default async function request<T>(endpoint='/', options: RequestInit = {}): Promise<T>{
	const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

	return response.json()
})
