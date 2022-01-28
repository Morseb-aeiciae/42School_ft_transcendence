import { Exclude } from "class-transformer";
import { BeforeInsert, Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import { Chat_userEntity } from "./chat-user.entity";
import { UserEntity } from "./user.entity";
import { hash, compare } from 'bcrypt';

@Entity()
export class ChatEntity extends AbstractEntity {

	@Column()
	name: string;

	@Column({nullable: true})
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

	@Column({nullable: true})
	protection: number;

	@Column({nullable: true})
	ownerId: number;

	@ManyToOne(() => UserEntity, {nullable: true, onDelete: 'CASCADE'}, )
	owner: UserEntity;

	@OneToMany(() => Chat_userEntity, Chat_userEntity => Chat_userEntity.chat ,{ onDelete: 'CASCADE' })
	chat_user: Chat_userEntity[];
}
