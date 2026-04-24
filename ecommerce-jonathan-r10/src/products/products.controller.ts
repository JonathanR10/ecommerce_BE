import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './products.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/common/roles.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<Products[]> {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = isNaN(pageNum) || pageNum <= 0 ? 1 : pageNum;
    const validLimit = isNaN(limitNum) || limitNum <= 0 ? 5 : limitNum;

    return this.productsService.getAllProducts(validPage, validLimit);
  }

  @Get('seeder')
  addProducts() {
    return this.productsService.addProducts();
  }

  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string): Promise<Products> {
    return this.productsService.getProductById(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newProductData: Products,
  ) {
    return this.productsService.updateProduct(id, newProductData);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.productsService.deleteProduct(id);
  }
}
