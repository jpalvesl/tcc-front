import api from './api';
const localDefaultEndpoint = 'login';

class AuthService {
	login(usernameOrEmail: string, password: string) {
		return api.post(`${localDefaultEndpoint}`, {
			usernameOrEmail,
			password
		});
	}
}

export default new AuthService();