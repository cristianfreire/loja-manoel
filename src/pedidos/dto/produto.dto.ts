// produto.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { ValidateNested, IsString } from "class-validator";
import { Type } from "class-transformer";
import { DimensionDto } from "./dimensions.dto";

export class ProdutoDto {
  @ApiProperty({ example: 'PS5' })
  @IsString()
  produto_id: string;

  @ApiProperty({ type: () => DimensionDto })
  @ValidateNested()
  @Type(() => DimensionDto)
  dimensoes: DimensionDto;
}
