export interface Usuario {
	id?: number;
	ehAdm?: boolean;
	ehProfessor?: boolean;
	email: string;
	nome: string;
	usuario: string;
	senha?: string;
	instituicaoAtualId?: number;
	imagemUrl: string;
}