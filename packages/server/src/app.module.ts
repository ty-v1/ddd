import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { RepositoryModule } from '@/repository/RepositoryModule';
import { ProjectModule } from '@/project/ProjectModule';

@Module({
  imports: [RepositoryModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
