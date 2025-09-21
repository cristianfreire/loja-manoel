import { Injectable } from "@nestjs/common";
import { EmpacotamentoService } from "src/empacotamento/empacotamento.service";

@Injectable()
export class PedidosService {
    constructor(private empacotar: EmpacotamentoService) { }

    empacotarPedidos(pedidos: { pedido_id: number, produtos: any[] }[]) {
        return pedidos.map(o => this.empacotar.empacotamentoPedido(o));
    }
}
