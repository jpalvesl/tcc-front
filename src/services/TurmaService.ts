import { EntrarEmTurmaPayload } from '../types/EntrarEmTurmaPayload';
import { Turma } from '../types/Turma';
import api from './api';
const localDefaultEndpoint = 'turma';

class TurmaService {
	findByInstituicao(instituicaoId: number) {
		return api.get(`${localDefaultEndpoint}/instituicao/${instituicaoId}`);
	}

	findById(turmaId: number) {
		return api.get(`${localDefaultEndpoint}/${turmaId}`);
	}
	
	findByUsuario(usuarioId: number) {
		return api.get(`${localDefaultEndpoint}/usuario/${usuarioId}`);
	}
  
	add(criadorId: number, payload: Turma)  {
		return api.post(`${localDefaultEndpoint}/criador/${criadorId}`, payload);
	}

	addAlunoEmTurma(turmaId: number, alunoId: number, criadorId: number) {
		return api.post(`${localDefaultEndpoint}/${turmaId}/aluno/${alunoId}/criador/${criadorId}`);
	}

	removerAlunoDaTurma(turmaId: number, alunoId: number, criadorId: number) {
		return api.delete(`${localDefaultEndpoint}/${turmaId}/aluno/${alunoId}/criador/${criadorId}`);
	}

	addProfessorEmTurma(turmaId: number, professorId: number, professorAdicionadoId: number) {
		return api.post(`${localDefaultEndpoint}/${turmaId}/professor/${professorId}/professor_adicionado/${professorAdicionadoId}`);
	}
	
	removerProfessorDaTurma(turmaId: number, professorId: number, professorAdicionadoId: number) {
		return api.delete(`${localDefaultEndpoint}/${turmaId}/professor/${professorId}/professor_adicionado/${professorAdicionadoId}`);
	}

	edit(usuarioId: number, payload: Turma) {
		return api.patch(`${localDefaultEndpoint}/usuario/${usuarioId}`, payload);
	}

	delete(turmaId: number, usuarioId: number) {
		return api.delete(`${localDefaultEndpoint}/${turmaId}/usuario/${usuarioId}`);
	}

	entrarEmTurma(usuarioId: number, entrarEmTurmaPayload: EntrarEmTurmaPayload) {
		return api.post(`${localDefaultEndpoint}/entrar_em_turma/usuario/${usuarioId}`, entrarEmTurmaPayload);
	}
}


export default new TurmaService();