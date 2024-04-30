import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import {
  ApiBaseResponse,
  Document,
  updateDocumentSchema,
} from '@./shared-types';
import { createZodDto } from 'nestjs-zod';

class UpdateDocumentDTO extends createZodDto(updateDocumentSchema) {}

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
}
