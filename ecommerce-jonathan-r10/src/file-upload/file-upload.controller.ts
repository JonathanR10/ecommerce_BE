import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Put('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            errorMessage: 'Supera el peso maximo',
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.png|.gif|.webp|.jpeg)/,
            errorMessage: 'Extensión del archivo no es valida',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return this.fileUploadService.uploadImage(productId, file);
  }
}
