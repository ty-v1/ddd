import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { RepositoryModule } from '@/repository/RepositoryModule';
import { ProjectModule } from '@/project/ProjectModule';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), RepositoryModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
