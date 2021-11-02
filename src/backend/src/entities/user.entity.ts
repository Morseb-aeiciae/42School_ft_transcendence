import { AbstractEntity } from './abstract-entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { IsEmail, IsString } from 'class-validator';
import { classToPlain, Exclude } from 'class-transformer';
import { hash, compare } from 'bcrypt';
import { Match_userEntity } from './match-user.entity';
import { Chat_userEntity } from './chat-user.entity';

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
	  if (this.password)
    	this.password = await hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await compare(attempt, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }

  @OneToMany(() => Match_userEntity, Match_userEntity => Match_userEntity.user)
 public match_user!: Match_userEntity[];

 @OneToMany(() => Chat_userEntity, Chat_userEntity => Chat_userEntity.chat)
	chat_user: Chat_userEntity[];
}
