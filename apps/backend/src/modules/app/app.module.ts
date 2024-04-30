import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from 'nest-neo4j';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: 'neo4j',
      host: process.env.NEO4J_HOST!,
      port: process.env.NEO4J_PORT!,
      username: process.env.NEO4J_USERNAME!,
      password: process.env.NEO4J_PASSWORD!,
    }),
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
