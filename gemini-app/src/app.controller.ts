import { Body, Controller, Get, HttpCode, HttpStatus, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { PromptBody, PromptBodyWithImages } from './dto/prompt.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("prompt")
  @HttpCode(HttpStatus.OK)
  getPromptResponse(@Body() body: PromptBody) {
    return this.appService.getPromptResponse(body.prompt);
  }

  /**
   * 
[
  {
    fieldname: 'images',
    originalname: 'Screenshot from 2023-07-25 20-19-52.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: 'upload',
    filename: '738ba4a3ad52b2f3c8b634c2d98d5ad2',
    path: 'upload/738ba4a3ad52b2f3c8b634c2d98d5ad2',
    size: 294746
  },
  {
    fieldname: 'images',
    originalname: 'Screenshot from 2023-07-05 14-44-29.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: 'upload',
    filename: 'bd90bb2556530e94ef31560931d6d501',
    path: 'upload/bd90bb2556530e94ef31560931d6d501',
    size: 195282
  }
]

   */

  @UseInterceptors(FilesInterceptor("images", 10))
  @HttpCode(HttpStatus.OK)
  @Post("prompt-with-image")
  getPromoptResponseWithImages(@UploadedFiles() images: Array<Express.Multer.File>, @Body() body: PromptBodyWithImages) {
    console.log(images)
    return this.appService.getPromoptResponseWithImages(body.prompt, images);
  }

}
