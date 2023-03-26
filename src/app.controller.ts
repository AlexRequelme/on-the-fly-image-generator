import { Controller, Get, Header, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('dynamic-image')
  @Header('Content-Type', 'image/png')
  generateDynamicImage(
    @Query('sm') socialMedia: string,
    @Query('name') fullName: string,
    @Query('username') username: string,
    @Query('avatar') avatar: string,
  ) {
    const params = { socialMedia, fullName, username, avatar };
    return this.appService.generateDynamicImage(params);
  }
}
