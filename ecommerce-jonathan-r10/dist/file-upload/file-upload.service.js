"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const file_upload_repository_1 = require("./file-upload.repository");
const products_service_1 = require("../products/products.service");
let FileUploadService = class FileUploadService {
    fileUploadRepository;
    productsService;
    constructor(fileUploadRepository, productsService) {
        this.fileUploadRepository = fileUploadRepository;
        this.productsService = productsService;
    }
    async uploadImage(productId, file) {
        const foundProduct = await this.productsService.getProductById(productId);
        if (foundProduct) {
            const result = await this.fileUploadRepository.uploadImage(file);
            if (!result.secure_url)
                throw new common_1.NotFoundException(`Falla al cargar imagen`);
            return await this.productsService.updateProductImgUrl(productId, result.secure_url);
        }
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_upload_repository_1.FileUploadRepository,
        products_service_1.ProductsService])
], FileUploadService);
//# sourceMappingURL=file-upload.service.js.map