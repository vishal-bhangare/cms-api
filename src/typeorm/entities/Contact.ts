import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'contacts' })
export class Contact {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name:string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;
}
