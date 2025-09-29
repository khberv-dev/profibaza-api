import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import e from 'express';
import * as path from 'node:path';
import { randomString } from '../../../utils/randomize';
import { BadRequestException } from '@nestjs/common';

export const avatarInterceptor = FileInterceptor('file', {
  limits: {
    fileSize: 5000000,
  },
  storage: diskStorage({
    destination: 'files/avatar',
    filename(
      req: e.Request,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void,
    ) {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        callback(
          new BadRequestException({
            ok: false,
            message: {
              uz: 'Faqat rasm yuklash mumkin',
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
