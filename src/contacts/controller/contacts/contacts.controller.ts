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
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NewContactDto } from 'src/contacts/dtos/newContact.dto';
import { UpdateContactDto } from 'src/contacts/dtos/updateContact.dto';
import { ContactsService } from 'src/contacts/services/contacts/contacts.service';
import { AuthGuard } from 'src/users/guards/auth-guard/auth.guard';
import { NewUserDto } from '../../../users/dtos/newUser.dto';

@ApiTags('Contacts')
@ApiBearerAuth()
@Controller('Contacts')
@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard)
export class ContactsController {
  constructor(private contactService: ContactsService) {}

  @Get(':userid')
  @ApiResponse({
    status: 200,
    description: 'Contacts of given userid',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiParam({
    name: 'userid',
    type: 'number',
  })
  getAllContacts(@Param('userid', ParseIntPipe) userid: number) {
    return this.contactService.getAllContact(userid);
  }

  @Post()
  @ApiCreatedResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({
    type: NewContactDto,
    description: 'Request body for creating new contact',
  })
  createContact(@Body() contactData: NewContactDto) {
    return this.contactService.createContact(contactData);
  }

  @Patch(':id')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @ApiBody({
    type: UpdateContactDto,
    description: 'Request body for updating contact',
  })
  updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() contactData: UpdateContactDto,
  ) {
    return this.contactService.updateContact(id, contactData);
  }

  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  deleteContact(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.deleteContact(id);
  }
}
