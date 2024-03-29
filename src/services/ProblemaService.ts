import { Problema } from '../types/Problema';
import api from './api';
const localDefaultEndpoint = 'problema';

class ProblemaService {
	
	findAll() {
		return api.get(`${localDefaultEndpoint}`);
	}

	findProblemasTentadosERespondidos(usuarioId: number) {
		return api.get(`${localDefaultEndpoint}/usuarioBuscado/${usuarioId}`);
	}

	findProblemasTentados(usuarioId: number) {
		return api.get(`${localDefaultEndpoint}/tentados/usuario/${usuarioId}`);
	}

	findById(problemaId: number) {
		return api.get(`${localDefaultEndpoint}/${problemaId}`);
	}

	findByTarefa(tarefaId: number) {
		return api.get(`${localDefaultEndpoint}/tarefa/${tarefaId}`);
	}

	findByTarefaAndUsuario(tarefaId: number, usuarioId: number) {
		return api.get(`${localDefaultEndpoint}/tarefa/${tarefaId}/usuario/${usuarioId}`);
	}

	add(problema: Problema) {
		return api.post(`${localDefaultEndpoint}`, problema);
	}

	edit(problema: Problema, usuarioId: number) {
		return api.patch(`${localDefaultEndpoint}/usuario/${usuarioId}`, problema);
	}

	delete(problemaId: number, usuarioId: number) {
		return api.delete(`${localDefaultEndpoint}/${problemaId}/usuario/${usuarioId}`);
	}

	addTopicoEmProblema(problemaId: number, topicoId: number) {
		return api.post(`${localDefaultEndpoint}/${problemaId}/topico/${topicoId}`);
	}

	removerTopicoEmProblema(problemaId: number, topicoId: number) {
		return api.delete(`${localDefaultEndpoint}/${problemaId}/topico/${topicoId}`);
	}
}


export default new ProblemaService();