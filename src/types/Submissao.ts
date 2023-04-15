export interface ISubmissaoRequest {
  codigoResposta: string;
}

export interface ISubmissaoResponse {
  id?: string;
  codigoResposta: string;
  problemaId: number;
  usuarioId: number;
  status: string;
  data: string;
  tempoMedio: string;
}
