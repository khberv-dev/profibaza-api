import { IsString } from 'class-validator';

export default class CommentFeedbackDto {
  @IsString()
  feedback: string;
}
