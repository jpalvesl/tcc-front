export interface Tarefa {
  id?: number;
  dtAbertura: string;
  dtEncerramento: string;
  ehProva: boolean;
  descricao: string;
  titulo: string;
  criadorId: number;
  turmaId: number;
  qtdProblemas: number;
  status?: string;
}