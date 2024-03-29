export interface Turma {
  id?: number;
  titulo?: string;
  semestre: string;
  dtAbertura: string;
  dtEncerramento?: string;
  nomeTurma: string;
  instituicaoId?: number;
  instituicaoTitulo?: string;
  professores: {
    id: number;
    nome?: string;
  }[];
  monitores: {
    id: number;
    nome?: string;
  }[];
}