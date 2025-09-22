import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { PedidosService } from "./pedidos.service";
import { PedidosDto } from "./dto/pedidos.dto";
import { JwtAuthGuard } from "src/auth/jwt.auth.guard";

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private service: PedidosService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token') // liga a rota com o Bearer JWT
  @Post('empacotar')
  @ApiOperation({ summary: 'Empacota vários pedidos e retorna a caixa usada' })
  empacotar(@Body() dto: PedidosDto) {
    return this.service.empacotarPedidos(dto.pedidos);
  }
}
