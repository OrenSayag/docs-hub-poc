import { Controller, Get, Param } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { ApiBaseResponse, Document } from '@./shared-types';

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
}
