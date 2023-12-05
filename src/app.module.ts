import { Module } from '@nestjs/common';
import { PublicationController } from './app.controller';
import { PublicationService } from './app.service';
import { DummyService } from './dataAccess/dummyService';

@Module({
  imports: [],
  controllers: [PublicationController],
  providers: [PublicationService, DummyService],
})
export class AppModule {}
