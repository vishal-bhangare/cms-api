import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from './Contact';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name:string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Contact, (Contact) => Contact.user)
  contacts: Contact[];
}
