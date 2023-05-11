import { EditSenha } from '../types/EditSenha';
import { GerenciarPermissoes } from '../types/GerenciarPermissoes';
import { Usuario } from '../types/Usuario';
import api from './api';
const localDefaultEndpoint = 'usuario';

class UsuarioService {
	
	findByInstituicao(instituicaoId: number) {
		return api.get(`${localDefaultEndpoint}/instituicao/${instituicaoId}`);
	}

	findAlunoByInstituicao(instituicaoId: number) {
		return api.get(`${localDefaultEndpoint}/aluno/instituicao/${instituicaoId}`);
	}

	findProfessorByInstituicao(instituicaoId: number) {
		return api.get(`${localDefaultEndpoint}/professor/instituicao/${instituicaoId}`);
	}

	findById(usuarioId: number) {
		return api.get(`${localDefaultEndpoint}/${usuarioId}`);
	}
  
	findByTurma(turmaId: number) {
		return api.get(`${localDefaultEndpoint}/turma/${turmaId}`);

	}

	cadastrar(payload: Usuario) {
		return api.post(`${localDefaultEndpoint}`, payload);
	}

	edit(usuarioId: number, payload: Usuario) {
		return api.patch(`${localDefaultEndpoint}/${usuarioId}`,payload);

	}

	delete(usuarioId: number) {
		return api.delete(`${localDefaultEndpoint}/${usuarioId}`);
	}

	editarSenha(usuarioId: number, editSenhaPayload: EditSenha) {
		return api.put(`${localDefaultEndpoint}/${usuarioId}/editar_senha`, editSenhaPayload);
	}

	gerenciarPermissoes(usuarioId: number, gerenciarPermissoesPayload: GerenciarPermissoes) {
		return api.post(`${localDefaultEndpoint}/${usuarioId}/gerenciar_permissoes`, gerenciarPermissoesPayload);
	}
}


export default new UsuarioService();