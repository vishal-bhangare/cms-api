import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateContactDto } from 'src/contacts/dtos/updateContact.dto';
import { Contact } from 'src/typeorm/entities/Contact';
import { User } from 'src/typeorm/entities/User';
import { ContactData } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private contactsRepo: Repository<Contact>,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  async getAllContact(userId: number) {
    const user = await this.usersRepo.findOneBy({ id: userId });
    return this.contactsRepo.findBy({ user: user });
  }
  async createContact(contactData: ContactData) {
    const user = await this.usersRepo.findOneBy({ id: contactData.userId });
    if (!user)
      throw new HttpException(
        'User not found. create new account.',
        HttpStatus.BAD_REQUEST,
      );
    const contact = this.contactsRepo.create({
      ...contactData,
      user,
    });
    return this.contactsRepo.save(contact);
  }
  async updateContact(id: number, contactData: UpdateContactDto) {
    const res = await this.contactsRepo.update({ id: id }, { ...contactData });
    if (res.affected) return { msg: 'contact updated.', status: HttpStatus.OK };
    else return { msg: 'contact not found.', status: HttpStatus.BAD_REQUEST };
  }
  async deleteContact(id: number) {
    const res = await this.contactsRepo.delete({ id: id });
    if (res.affected) return { msg: 'contact deleted.', status: HttpStatus.OK };
    return { msg: 'contact not found.', status: HttpStatus.BAD_REQUEST };
  }
}
