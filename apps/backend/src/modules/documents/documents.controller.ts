import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import {
  ApiBaseResponse,
  createDocumentSchema,
  Document,
  updateDocumentSchema,
} from '@docs-hub/shared-types';
import { createZodDto } from 'nestjs-zod';

class UpdateDocumentDTO extends createZodDto(updateDocumentSchema) {}
class CreateDocumentDTO extends createZodDto(createDocumentSchema) {}

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentService: DocumentsService) {}

  @Get(':id')
  public async getDocumentById(
    @Param('id') id: string,
  ): Promise<ApiBaseResponse<Document>> {
    const document = await this.documentService.getDocumentById({
      id,
    });
    return {
      success: true,
      message: 'Successfully fetched document',
      data: document,
    };
  }
  @Patch(':id')
  public async updateDocument(
    @Param('id') id: string,
    @Body() data: UpdateDocumentDTO,
  ): Promise<ApiBaseResponse<void>> {
    await this.documentService.updateDocument({
      id,
      ...data,
    });
    return {
      success: true,
      message: 'Successfully updated document',
      data: undefined,
    };
  }

  @Post('')
  public async createDocument(
    @Param('id') id: string,
    @Body() { name, content, parentId }: CreateDocumentDTO,
  ): Promise<ApiBaseResponse<void>> {
    await this.documentService.createDocument({
      name,
      content,
      parentId,
    });
    return {
      success: true,
      message: 'Successfully created document',
      data: undefined,
    };
  }

  @Delete(':id')
  public async deleteDocument(
    @Param('id') id: string,
  ): Promise<ApiBaseResponse<void>> {
    await this.documentService.deleteDocument({
      id,
    });
    return {
      success: true,
      message: 'Successfully deleted document',
      data: undefined,
    };
  }
}
