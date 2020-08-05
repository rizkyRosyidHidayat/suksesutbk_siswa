import axios from 'axios'

const http = axios.create({
	baseURL: 'https://app.suksesutbk.com/api/v1/',
	headers: {
		'Authorization': 'Bearer '+window.localStorage.getItem('token'),
	}
})

export default http