import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NewContactDto } from 'src/contacts/dtos/newContact.dto';
import { UpdateContactDto } from 'src/contacts/dtos/updateContact.dto';
import { ContactsService } from 'src/contacts/services/contacts/contacts.service';
import { AuthGuard } from 'src/users/guards/auth-guard/auth.guard';

@Controller('contacts')
@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard)
export class ContactsController {
  constructor(private contactService: ContactsService) {}

  @Get(':userid')
  getAllContacts(@Param('userid', ParseIntPipe) userid: number) {
    return this.contactService.getAllContact(userid);
  }

  @Post()
  createContact(@Body() contactData: NewContactDto) {
    return this.contactService.createContact(contactData);
  }

  @Patch(':id')
  updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() contactData: UpdateContactDto,
  ) {
    return this.contactService.updateContact(id, contactData);
  }

  @Delete(':id')
  deleteContact(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.deleteContact(id);
  }
}
