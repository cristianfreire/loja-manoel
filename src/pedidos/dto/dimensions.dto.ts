// dimensions.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DimensionDto {
  @ApiProperty({ example: 40 })
  @IsNumber()
  altura: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  largura: number;

  @ApiProperty({ example: 25 })
  @IsNumber()
  comprimento: number;
}
