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
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene el listado de todos los productos' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
    description: 'Numero de pagina para el paginado',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
    description: 'Numero de productos por pagina',
  })
  @ApiResponse({
    status: 200,
    description: 'Acceso al listado de productos correctamente',
  })
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
  @ApiOperation({
    summary: 'Ruta para agregar productos (seeder)',
  })
  @ApiResponse({
    status: 200,
    description: 'Productos agregados correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'La categoría para el producto a agregar no existe',
  })
  addProducts() {
    return this.productsService.addProducts();
  }

  @Get(':id')
  @ApiOperation({
    summary:
      'Obtiene la información del producto correspondiente al id proporcionado',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Productos retornado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  getProductById(@Param('id', ParseUUIDPipe) id: string): Promise<Products> {
    return this.productsService.getProductById(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualiza la información del producto correspondiente al id',
  })
  @ApiBody({ type: Products })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Id del producto a actualizar',
  })
  @ApiResponse({ status: 401, description: 'Sesión invalida' })
  @ApiResponse({
    status: 403,
    description: 'Permisos insuficientes para acceder a la ruta',
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newProductData: Products,
  ) {
    return this.productsService.updateProduct(id, newProductData);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Borra el producto correspondiente al id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Id del producto a eliminar',
  })
  @ApiResponse({
    status: 200,
    description: 'Productos eliminado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.productsService.deleteProduct(id);
  }
}
