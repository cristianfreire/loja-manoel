export interface PacoteCaixa {
    caixa_id: string;
    produtos: { id: string; altura: number; largura: number; comprimento: number }[];
}
export interface PedidoPacoteResult {
    pedido_id: string;
    caixas: PacoteCaixa[];  
}