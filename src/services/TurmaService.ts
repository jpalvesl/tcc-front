import api from './api';
const localDefaultEndpoint = 'turma';

class TurmaService {
	findByInstituicao(instituicaoId: number) {
		return api.get(`${localDefaultEndpoint}/instituicao/${instituicaoId}`);
	}

	findById() {}
	
	findByUsuario() {}
  
	add() {}

	addAlunoEmTurma() {}

	removerAlunoDaTurma() {}

	addProfessorEmTurma() {}
	
	removerProfessorDaTurma() {}

	edit() {}

	delete() {}
}


export default new TurmaService();