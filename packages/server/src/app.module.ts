import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { RepositoryModule } from '@/repository/RepositoryModule';
import { ProjectModule } from '@/project/ProjectModule';
import { ConfigModule } from '@nestjs/config';
import { LabelModule } from '@/label/LabelModule';
import { SharedModule } from '@/shared/SharedModule';

@Module({
  imports: [ConfigModule.forRoot(), RepositoryModule, SharedModule, ProjectModule, LabelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
