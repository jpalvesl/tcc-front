import { Tarefa } from '../types/Tarefa';
import api from './api';
const localDefaultEndpoint = 'tarefa';

class TurmaService {
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

	delete() {}
  
	addProblemaEmTarefa() {}

}

export default new TurmaService;