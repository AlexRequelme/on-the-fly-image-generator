import { Injectable } from '@nestjs/common';
import { createCanvas, loadImage } from 'canvas';
import type { Canvas, CanvasRenderingContext2D } from 'canvas';
import { Readable } from 'stream';
import { registerFonts } from './utils/helpers';
import templates from './utils/templateStyles';

@Injectable()
export class CanvasService {
  private canvas: Canvas;
  private ctx: CanvasRenderingContext2D;
  private centerX: number;
  private centerY: number;

  constructor() {
    registerFonts({
      'LeagueSpartan-Bold': './src/assets/fonts/LeagueSpartan-Bold.ttf',
      'LeagueSpartan-Regular': './src/assets/fonts/LeagueSpartan-Regular.ttf',
    });
    this.canvas = createCanvas(1080, 1920);
    this.ctx = this.canvas.getContext('2d');
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
  }

  async patchTemplateWithData(template: string, data: any): Promise<Readable> {
    const appName = templates[template] ? template : 'AppName';
    const templateStyle = templates[template] || templates['base'];
    this.setBackgroundColor(templateStyle.backgroundColor);
    this.drawCard();
    this.centerText(
      'VIEW MY PROFILE ON',
      'black',
      '48px LeagueSpartan-Bold',
      this.centerY - 400,
    );
    this.centerText(
      appName.charAt(0).toUpperCase() + appName.slice(1),
      templateStyle.foregroundColor,
      '72px LeagueSpartan-Bold',
      this.centerY - 280,
    );
    await this.drawAvatar(data.avatar, 200, templateStyle.accentColor);
    this.centerText(
      data.fullName || 'Full Name',
      'black',
      '48px LeagueSpartan-Regular',
      this.centerY + 300,
    );
    this.centerText(
      `@${data.username || 'username'}`,
      '#4b5563',
      '44px LeagueSpartan-Regular',
      this.centerY + 372,
    );
    return this.canvas.createPNGStream();
  }

  private setBackgroundColor(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawCard() {
    const [w, h] = [856, 1028];
    const [x, y] = [this.centerX - w / 2, this.centerY - h / 2 - 50];
    this.ctx.fillStyle = '#ffffff';
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    this.ctx.shadowBlur = 3;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 1;
    this.ctx.roundRect(x, y, w, h, h / 8);
    this.ctx.fill();
  }

  private centerText(text: string, color: string, font: string, y: number) {
    this.ctx.fillStyle = color;
    this.ctx.font = font;
    const textWidth = this.ctx.measureText(text).width;
    this.ctx.fillText(text, this.centerX - textWidth / 2, y);
  }

  private async drawAvatar(avatar: string, radius: number, ringColor: string) {
    const [x, y] = [this.centerX, this.centerY];
    const innerRadius = radius - 20;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.lineWidth = 12;
    this.ctx.strokeStyle = ringColor;
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.fillStyle = '#f3f4f6';
    this.ctx.arc(x, y, innerRadius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
    if (avatar) {
      this.ctx.save();
      this.ctx.clip();
      this.ctx.drawImage(
        await loadImage(avatar),
        x - innerRadius,
        y - innerRadius,
        innerRadius * 2,
        innerRadius * 2,
      );
      this.ctx.restore();
    }
  }
}
