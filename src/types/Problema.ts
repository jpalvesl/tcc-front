export interface Problema {
  id?: number;
  descricao: string;
  dificuldade: string;
  fonte: string;
  nome: string;
  textoEntrada: string;
  textoSaida: string;
  criadorId: string;
  topicos: number[];
  autor?: string;
}