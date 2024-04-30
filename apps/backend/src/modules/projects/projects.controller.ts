import { Controller, Get, Param } from '@nestjs/common';
import { ApiBaseResponse, ProjectTree } from '@./shared-types';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @Get(':id/tree')
  public async getProjectTree(
    @Param('id') id: string,
  ): Promise<ApiBaseResponse<ProjectTree>> {
    const res = await this.projectsService.getProjectTreeById({
      id,
    });
    return {
      success: true,
      message: 'Successfully fetched project tree',
      data: res,
    };
  }
}
