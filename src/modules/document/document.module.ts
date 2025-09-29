import { Module } from '@nestjs/common';
import DocumentRepository from './document.repository';

@Module({
  providers: [DocumentRepository],
  exports: [DocumentRepository],
})
export default class DocumentModule {}
