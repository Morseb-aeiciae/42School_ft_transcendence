import { AbstractEntity } from './abstract-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { Match_userEntity } from './match-user.entity';
import { Chat_userEntity } from './chat-user.entity';
import { Role } from 'src/admin/Role/role.enum';
import { Status } from 'src/status.enum';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  @IsEmail()
  @IsString()
  email: string;

  @Column()
  @IsString()
  username: string;

  @Column({ default: null, nullable: true })
  image: string | null;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.User})
  role: Role;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.Online})
  status: Status;

  @Column({default: false})
  @IsBoolean()
  isBan: boolean;

  @Column({unique: true})
  @IsString()
  login: string;

  @Column({nullable: true})
  public twoFactorAuthenticationSecret?: string;

  @Column({ default: false })
  public isTwoFactorAuthenticationEnabled: boolean;

  @OneToMany(() => Match_userEntity, Match_userEntity => Match_userEntity.user)
 public match_user!: Match_userEntity[];

 @OneToMany(() => Chat_userEntity, Chat_userEntity => Chat_userEntity.chat)
	chat_user: Chat_userEntity[];
}
