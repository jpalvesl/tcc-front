import { ISubmissaoRequest } from '../types/Submissao';
import api from './api';
const localDefaultEndpoint = 'submissao';

class CasosDeTesteService {
	findAll() {
		return api.get(`${localDefaultEndpoint}`);
	}

	findByUsuario(usuarioId: number) {
		return api.get(`${localDefaultEndpoint}/usuario/${usuarioId}`);
	}

	findByProblema(problemaId: number) {
		return api.get(`${localDefaultEndpoint}/problema/${problemaId}`);
	}

	findByUsuarioAndProblema(usuarioId: number, problemaId: number) {}

	realizaSubmissao(usuarioId: number, submissao: ISubmissaoRequest) {
		return api.post(`${localDefaultEndpoint}/usuario/${usuarioId}`, submissao);
	}

}

export default new CasosDeTesteService();