import { Topico } from '../types/Topico';
import api from './api';
const localDefaultEndpoint = 'topico';

class TopicoService {
	findByAll() {
		return api.get(`${localDefaultEndpoint}`);
	}

	findByProblema(problemaId: number) {
		return api.get(`${localDefaultEndpoint}/problema/${problemaId}`);
	}

	add(topico: Topico) {
		return api.post(`${localDefaultEndpoint}`, topico);
	}

	edit(topico: Topico) {
		return api.patch(`${localDefaultEndpoint}`, topico);
	}

	delete(topicoId: number) {
		return api.delete(`${localDefaultEndpoint}/${topicoId}`);
	}
}

export default new TopicoService();