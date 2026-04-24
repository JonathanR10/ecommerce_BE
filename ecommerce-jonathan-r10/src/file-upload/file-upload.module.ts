import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { FileUploadRepository } from './file-upload.repository';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryConfig, FileUploadRepository],
})
export class FileUploadModule {}
