import { Module } from "@nestjs/common";
import { PedidosController } from "./pedidos.controller";
import { PedidosService } from "./pedidos.service";
import { EmpacotamentoService } from "src/empacotamento/empacotamento.service";

@Module({
    controllers: [PedidosController],
    providers: [PedidosService, EmpacotamentoService],

}) export class PedidosModule{}