import { Instituicao } from '../types/Instituicao';
import api from './api';
const localDefaultEndpoint = 'instituicao';

class InstituicaoService {
	
	findAll() {
		return api.get(`${localDefaultEndpoint}`);
	}

	findById(instituicaoId: number) {
		return api.get(`${localDefaultEndpoint}/${instituicaoId}`);
	}

	add(instituicao: Instituicao) {
		return api.post(`${localDefaultEndpoint}`, instituicao);
	}

	edit(instituicao: Instituicao, usuarioId: number) {
		return api.patch(`${localDefaultEndpoint}/usuario/${usuarioId}`, instituicao);
	}

	delete(instituicaoId: number, usuarioId: number) {
		return api.delete(`${localDefaultEndpoint}/${instituicaoId}/usuario/${usuarioId}`);
	}
}


export default new InstituicaoService();