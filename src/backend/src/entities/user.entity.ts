import { AbstractEntity } from './abstract-entity';
import { BeforeInsert, Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { IsEmail, IsString } from 'class-validator';
import { classToPlain, Exclude } from 'class-transformer';
import { hash, compare } from 'bcrypt';
import { MatchEntity } from './match.entity';

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await compare(attempt, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }
}
