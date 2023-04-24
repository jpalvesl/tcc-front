import { ISubmissaoRequest } from '../types/Submissao';
import api from './api';
const localDefaultEndpoint = 'submissao';

class SubmissaoService {
	findAll() {
		return api.get(`${localDefaultEndpoint}`);
	}

	findByUsuario(usuarioId: number) {
		return api.get(`${localDefaultEndpoint}/usuario/${usuarioId}`);
	}

	findByProblema(problemaId: number) {
		return api.get(`${localDefaultEndpoint}/problema/${problemaId}`);
	}

	findByUsuarioAndProblema(usuarioId: number, problemaId: number) {
		return api.get(`${localDefaultEndpoint}/usuario/${usuarioId}/problema/${problemaId}`);
	}

	realizaSubmissao(problemaId:number, usuarioId: number, submissao: ISubmissaoRequest) {
		return api.post(`${localDefaultEndpoint}/problema/${problemaId}/usuario/${usuarioId}`, submissao);
	}

}

export default new SubmissaoService();