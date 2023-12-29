import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUtil } from './file/file.util';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.registerAsync({
      imports: [FileModule],
      useFactory: (fileUtil: FileUtil) => ({
        fileFilter: fileUtil.imageFileFilter,
        storage: diskStorage({
          destination: "upload",
          filename: fileUtil.editFileName
        })
      }),
      inject: [FileUtil]
    })
  ],
  controllers: [AppController],
  providers: [AppService, FileUtil],
})
export class AppModule { }
