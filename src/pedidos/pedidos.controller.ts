import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PedidosService } from "./pedidos.service";
import { PedidosDto } from "./dto/pedidos.dto";

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private service: PedidosService) {}

  @Post('empacotar')
  @ApiOperation({ summary: 'Empacota vários pedidos e retorna a caixa usada' })
  empacotar(@Body() dto: PedidosDto) {
    return this.service.empacotarPedidos(dto.pedidos);
  }
}
