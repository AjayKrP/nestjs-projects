import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from "fs";

@Injectable()
export class AppService {
  private genAI: any;
  private geminiPro: any;
  private geminiProVision: any;

  constructor(private readonly config: ConfigService) {
    this.genAI = new GoogleGenerativeAI(this.config.get("API_KEY"));
    this.geminiPro = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    this.geminiProVision = this.genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getPromptResponse(prompt: string): Promise<string> {
    const result = await this.geminiPro.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }

  async getPromoptResponseWithImages(prompt: string, images: Array<Express.Multer.File>): Promise<string> {

    const imageParts = [];
    for (let image of images) {
      imageParts.push(this.fileToGenerativePart(image.path, image.mimetype))
    }
    const result = await this.geminiProVision.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
  }

  // Converts local file information to a GoogleGenerativeAI.Part object.
  fileToGenerativePart(path: string, mimeType: string) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType
      },
    };
  }

}
