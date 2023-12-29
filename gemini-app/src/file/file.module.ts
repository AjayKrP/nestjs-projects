import { Module } from "@nestjs/common";
import { FileUtil } from "./file.util";

@Module({
    exports: [FileUtil],
    providers: [FileUtil]
})
export class FileModule{}