import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { RepositoryModule } from '@/repository/RepositoryModule';
import { ProjectModule } from '@/project/ProjectModule';
import { ConfigModule } from '@nestjs/config';
import { LabelModule } from '@/label/LabelModule';
import { SharedModule } from '@/shared/SharedModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabelRecord } from '@/repository/record/LabelRecord';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ddd',
      entities: [LabelRecord],
      synchronize: false,
    }),
    RepositoryModule,
    SharedModule,
    ProjectModule,
    LabelModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
