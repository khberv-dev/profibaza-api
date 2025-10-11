import { Module } from '@nestjs/common';
import { RatingCron } from './rating.cron';

@Module({
  providers: [RatingCron],
})
export default class CronModule {}
