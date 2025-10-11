import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import DatabaseService from '../database/database.service';

@Injectable()
export class RatingCron {
  constructor(private databaseService: DatabaseService) {}

  logger = new Logger(RatingCron.name);

  @Cron(CronExpression.EVERY_HOUR)
  async calculateWorkerProfessionsRating() {
    this.logger.log('Starting re-calculate ratings');

    const workerProfessions = await this.databaseService.workerProfession.findMany();

    for (const workerProfession of workerProfessions) {
      const starRatingData: Map<number, number> = new Map<number, number>([
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
      ]);
      const orders = await this.databaseService.order.findMany({
        where: {
          workerProfessionId: workerProfession.id,
        },
        include: {
          comments: true,
        },
      });

      for (const order of orders) {
        for (const comment of order.comments) {
          starRatingData.set(comment.rating, (starRatingData.get(comment.rating) || 0) + 1);
        }
      }

      let starRatingSum = 0;
      let starRatingCountSum = 0;

      for (const [rating, count] of starRatingData) {
        starRatingSum += rating * count;
        starRatingCountSum += count;
      }

      const rating = starRatingSum / starRatingCountSum;

      await this.databaseService.workerProfession.update({
        where: { id: workerProfession.id },
        data: {
          rating,
        },
      });
    }

    this.logger.log('Finished re-calculate ratings');
  }
}
