import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  // @Column()
  // password: string;

  // @Column()
  // name: string;

  // @Column({ unique: true })
  // contact: string;

  // @Column()
  // what: string;

  // @Column()
  // user_birthday: string;
}
