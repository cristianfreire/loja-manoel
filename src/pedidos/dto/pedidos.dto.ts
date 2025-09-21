// pedidos.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PedidoDto } from "./pedido.dto";

export class PedidosDto {
  @ApiProperty({ type: [PedidoDto] })
  @ValidateNested({ each: true })
  @Type(() => PedidoDto)
  pedidos: PedidoDto[];
}
