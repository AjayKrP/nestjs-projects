import { Injectable } from "@nestjs/common";
import { extname } from "path";

@Injectable()
export class FileUtil {
    editFileName(req: any, file: any, callback: any) {
        const name = file.originalname.split('.')[0];
        const fileExtName = extname(file.originalname);
        const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
        callback(null, `${name}-${randomName}${fileExtName}`);
    }

    imageFileFilter(req: any, file: any, callback: any) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
    }
}