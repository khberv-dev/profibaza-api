import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import e from 'express';
import * as path from 'node:path';
import { randomString } from '../../../utils/randomize';
import { BadRequestException } from '@nestjs/common';

export const orderMaterialInterceptor = FileInterceptor('file', {
  storage: diskStorage({
    destination: 'files/order',
    filename(req: e.Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|mp4|avi|mkv)$/)) {
        callback(
          new BadRequestException({
            ok: false,
            message: {
              uz: 'Faqat rasm yoki video yuklash mumkin',
            },
          }),
          '',
        );
      }

      const ext = path.extname(file.originalname);
      const name = randomString(20);

      callback(null, name + ext);
    },
  }),
});
