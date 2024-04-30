import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { DirectoriesService } from './directories.service';
import { createZodDto } from 'nestjs-zod';
import {
  ApiBaseResponse,
  createDirectorySchema,
  updateDirectorySchema,
} from '@./shared-types';

class CreateDirectoryDto extends createZodDto(createDirectorySchema) {}
class UpdateDirectoryDto extends createZodDto(updateDirectorySchema) {}

@Controller('directories')
export class DirectoriesController {
  constructor(private readonly directoriesService: DirectoriesService) {}

  @Post()
  public async createDirectory(
    @Body() { name, parentId }: CreateDirectoryDto,
  ): Promise<ApiBaseResponse<void>> {
    await this.directoriesService.createDirectory({ parentId, name });
    return {
      success: true,
      message: 'Successfully created directory',
      data: undefined,
    };
  }

  @Delete(':id')
  public async deleteDirectory(
    @Param('id') id: string,
  ): Promise<ApiBaseResponse<void>> {
    await this.directoriesService.deleteDirectory({ id });
    return {
      success: true,
      message: 'Successfully deleted directory',
      data: undefined,
    };
  }

  @Patch(':id')
  public async updateDirectory(
    @Body() { name }: UpdateDirectoryDto,
    @Param('id') id: string,
  ): Promise<ApiBaseResponse<void>> {
    await this.directoriesService.updateDirectory({
      name,
      id,
    });
    return {
      success: true,
      message: 'Successfully updated directory',
      data: undefined,
    };
  }
}
