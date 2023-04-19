export interface Problema {
  id?: number;
  descricao: string;
  dificuldade: string;
  fonte: string;
  nome: string;
  textoEntrada: string;
  textoSaida: string;
  criadorId: string;
  topicos: {
    id: number;
    nome?: string;
  }[];
  autor?: string;
  problemaDeProva: boolean;
  tempoLimite: number;
  limiteDeMemoria: number;
}