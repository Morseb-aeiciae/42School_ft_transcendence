import { AbstractEntity } from './abstract-entity';
import { Column, Entity } from 'typeorm';
import { IsEmail, IsString } from 'class-validator';
import { classToPlain, Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  @IsEmail()
  @IsString()
  email: string;

  @Column({ unique: true })
  @IsString()
  username: string;

  @Column({ default: null, nullable: true })
  image: string | null;

  @Column()
  @Exclude()
  password: string;

  // @BeforeInsert()
  // async encryptPassword() {
  //
  // }

  async comparePassword(attempt: string) {
    return true;
  }

  toJSON() {
    return classToPlain(this);
  }
}
