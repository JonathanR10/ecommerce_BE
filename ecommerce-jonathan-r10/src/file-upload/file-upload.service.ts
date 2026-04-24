import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    private readonly productsService: ProductsService,
  ) {}

  async uploadImage(productId: string, file: Express.Multer.File) {
    const foundProduct = await this.productsService.getProductById(productId);
    if (foundProduct) {
      const result = await this.fileUploadRepository.uploadImage(file);
      if (!result.secure_url)
        throw new NotFoundException(`Falla al cargar imagen`);

      return await this.productsService.updateProductImgUrl(
        productId,
        result.secure_url,
      );
    }
  }
}
