import { Injectable, StreamableFile } from '@nestjs/common';
import { createCanvas, loadImage, registerFont } from 'canvas';

@Injectable()
export class AppService {
  constructor() {
    registerFont('./src/assets/fonts/LeagueSpartan-Bold.ttf', {
      family: 'LeagueSpartan-Bold',
    });
    registerFont('./src/assets/fonts/LeagueSpartan-Regular.ttf', {
      family: 'LeagueSpartan-Regular',
    });
  }

  async generateDynamicImage(params: any): Promise<StreamableFile> {
    const imgCanvas = createCanvas(640, 640);
    const ctx = imgCanvas.getContext('2d');
    ctx.fillStyle = '#da9abf';
    ctx.fillRect(0, 0, imgCanvas.width, imgCanvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 1;
    ctx.roundRect(160, 120, 320, 368, 32);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.font = '20px LeagueSpartan-Bold';
    const titleText = 'VIEW MY PROFILE ON';
    const titleTextWidth = ctx.measureText(titleText).width;
    ctx.fillText(titleText, 320 - titleTextWidth / 2, 180);
    ctx.font = '28px LeagueSpartan-Bold';
    ctx.fillStyle = '#E1306C';
    const appName = params.appName || 'AppName';
    const appNameWidth = ctx.measureText(appName).width;
    ctx.fillText(appName, 320 - appNameWidth / 2, 226);
    ctx.beginPath();
    ctx.arc(320, 320, 64, 0, 2 * Math.PI);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#F56040';
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.font = '18px LeagueSpartan-Regular';
    const userFullName = params.fullName || 'Full Name';
    const userFullNameWidth = ctx.measureText(userFullName).width;
    ctx.fillText(userFullName, 320 - userFullNameWidth / 2, 424);
    ctx.font = '14px LeagueSpartan-Regular';
    ctx.fillStyle = '#4b5563';
    const username = `@${params.username || 'username'}`;
    const usernameWidth = ctx.measureText(username).width;
    ctx.fillText(username, 320 - usernameWidth / 2, 448);
    if (params.avatar) {
      ctx.beginPath();
      ctx.arc(320, 320, 56, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();
      const avatar = await loadImage(params.avatar);
      ctx.drawImage(avatar, 264, 264, 112, 112);
    }

    return new StreamableFile(imgCanvas.createPNGStream());
  }
}
