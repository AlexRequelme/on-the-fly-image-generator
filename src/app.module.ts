import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CanvasModule } from './canvas/canvas.module';

@Module({
  imports: [CanvasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
