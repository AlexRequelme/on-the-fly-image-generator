import { Controller, Get, Header, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('dynamic-image')
  @Header('Content-Type', 'image/png')
  generateDynamicImage(
    @Query('appName') appName: string,
    @Query('fullName') fullName: string,
    @Query('username') username: string,
    @Query('avatar') avatar: string,
  ) {
    return this.appService.generateDynamicImage({
      appName,
      fullName,
      username,
      avatar,
    });
  }
}
