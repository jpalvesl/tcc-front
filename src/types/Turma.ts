export interface Turma {
  id?: number;
  titulo?: string;
  semestre: string;
  dtAbertura: string;
  dtEncerramento?: string;
  nomeTurma: string;
  instituicaoId?: number;
}