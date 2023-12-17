import { Module } from '@nestjs/common';
import { ContactsController } from './controller/contacts/contacts.controller';
import { ContactsService } from './services/contacts/contacts.service';
import { Contact } from 'src/typeorm/entities/Contact';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([Contact,User])],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
