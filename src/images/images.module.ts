import { Module } from "@nestjs/common";
import { ImageController } from "./images.controller";

@Module({
    controllers: [ImageController],
  })
  export class ImageModule {}