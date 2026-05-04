import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({
    summary: 'Ruta para obtener el listado de categorias existentes',
  })
  @ApiResponse({
    status: 200,
    description: 'Acceso al listado de categorias correctamente',
  })
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get('seeder')
  @ApiOperation({
    summary: 'Ruta para agregar categorias (seeder)',
  })
  @ApiResponse({
    status: 200,
    description: 'Categorias agregadas correctamente',
  })
  addCategories() {
    return this.categoriesService.addCategories();
  }
}
