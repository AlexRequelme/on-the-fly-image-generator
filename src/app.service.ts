import { Injectable, StreamableFile } from '@nestjs/common';
import { CanvasService } from './canvas/canvas.service';

@Injectable()
export class AppService {
  constructor(private readonly canvasService: CanvasService) {}

  async generateDynamicImage({ socialMedia, ...data }: any) {
    return new StreamableFile(
      await this.canvasService.patchTemplateWithData(socialMedia, data),
    );
  }
}
