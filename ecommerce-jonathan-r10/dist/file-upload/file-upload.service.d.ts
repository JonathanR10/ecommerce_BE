import { FileUploadRepository } from './file-upload.repository';
import { ProductsService } from 'src/products/products.service';
export declare class FileUploadService {
    private readonly fileUploadRepository;
    private readonly productsService;
    constructor(fileUploadRepository: FileUploadRepository, productsService: ProductsService);
    uploadImage(productId: string, file: Express.Multer.File): Promise<import("../products/products.entity").Products | null | undefined>;
}
