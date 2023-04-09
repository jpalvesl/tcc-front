import { ICasosDeTeste } from '../types/CasosDeTeste';
import api from './api';
const localDefaultEndpoint = 'caso_teste';

class CasosDeTesteService {
	findBySubmissao(submissaoId: number) {
		return api.get(`${localDefaultEndpoint}/${submissaoId}`);
	}

	findByProblema(problemaId: number) {
		return api.get(`${localDefaultEndpoint}/problema/${problemaId}`);
	}

	add(problemaId: number, criadorId: number, casoTeste: ICasosDeTeste) {
		return api.post(`${localDefaultEndpoint}/problema/${problemaId}/criador/${criadorId}`, casoTeste);
	}

	edit(usuarioId: number, casoTeste: ICasosDeTeste) {
		return api.patch(`${localDefaultEndpoint}/usuario/${usuarioId}`);
	}

	delete(casoTesteId: number, criadorId: number) {
		return api.delete(`${localDefaultEndpoint}/${casoTesteId}/usuario/${criadorId}`);
	}
}

export default new CasosDeTesteService();