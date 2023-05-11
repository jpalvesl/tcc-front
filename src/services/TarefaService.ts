import { Tarefa } from '../types/Tarefa';
import api from './api';
const localDefaultEndpoint = 'tarefa';

class TarefaService {
	findByAluno(usuarioId: number) {
		return api.get(`${localDefaultEndpoint}/usuario/${usuarioId}`);
	}

	findByTurma(turmaId: number) {
		return api.get(`${localDefaultEndpoint}/turma/${turmaId}`);
	}

	findById(tarefaId: number) {
		return api.get(`${localDefaultEndpoint}/${tarefaId}`);
	}

	add(payload: Tarefa) {
		return api.post(`${localDefaultEndpoint}`, payload);
	}

	edit(payload: Tarefa, criadorId: number) {
		return api.patch(`${localDefaultEndpoint}/usuario/${criadorId}`, payload);
	}

	delete(id: number, usuarioId: number) {
		return api.delete(`${localDefaultEndpoint}/${id}/usuario/${usuarioId}`);
	}
  
	addProblemaEmTarefa(problemaId: number, id: number, usuarioId: number) {
		return api.post(`${localDefaultEndpoint}/${id}/problema/${problemaId}/usuario/${usuarioId}`);
	}

	removerProblemaEmTarefa(id: number, problemaId: number, usuarioId: number) {
		return api.delete(`${localDefaultEndpoint}/${id}/problema/${problemaId}/usuario/${usuarioId}`);
	}

	statusTarefa(tarefaId: number, usuarioId: number) {
		return api.get(`${localDefaultEndpoint}/${tarefaId}/usuario/${usuarioId}/status`);
	}
}

export default new TarefaService;