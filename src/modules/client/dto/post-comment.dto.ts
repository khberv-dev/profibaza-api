import { IsInt, IsOptional, IsString } from 'class-validator';

export default class PostCommentDto {
  @IsString()
  comment: string;

  @IsOptional()
  @IsInt()
  rate: number;
}
