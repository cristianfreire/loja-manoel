// pedido.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { ProdutoDto } from "./produto.dto";

export class PedidoDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  pedido_id: number;

  @ApiProperty({ type: [ProdutoDto] })
  @ValidateNested({ each: true })
  @Type(() => ProdutoDto)
  produtos: ProdutoDto[];
}
