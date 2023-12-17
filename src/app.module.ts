import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './typeorm/entities/User';
import { ContactsModule } from './contacts/contacts.module';
import { Contact } from './typeorm/entities/Contact';

console.log(process.env.DB)
@Module({
  imports: [ ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: 5432,
      password: process.env.PGPASSWORD,
      username: process.env.PGUSER,
      entities: [User,Contact],
      database: process.env.PGDATABASE,
      synchronize: true,
      logging: true,
      ssl:true
    }),
    UsersModule,
    ContactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
