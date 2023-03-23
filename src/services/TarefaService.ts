import { Tarefa } from '../types/Tarefa';
import api from './api';
const localDefaultEndpoint = 'tarefa';

class TurmaService {
	findByAluno(usuarioId: number) {
		return api.get(`${localDefaultEndpoint}/usuario/${usuarioId}`);
	}

	findByTurma() {}

	add() {}

	edit() {}

	delete() {}
  
	addProblemaEmTarefa() {}

}

export default new TurmaService;