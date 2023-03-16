import api from './api';
const localDefaultEndpoint = 'usuario';

class UsuarioService {
	findByInstituicao(instituicaoId: number) {
		return api.get(`${localDefaultEndpoint}/instituicao/${instituicaoId}`);
	}

	findById() {}
  
	findByTurma() {}

	cadastrar() {}

	edit() {}

	delete() {}
}


export default new UsuarioService();