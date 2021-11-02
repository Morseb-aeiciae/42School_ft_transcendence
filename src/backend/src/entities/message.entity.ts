import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import { ChatEntity } from "./chat.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class MessageEntity extends AbstractEntity {
	
	@Column()
	chatId: number;

	@Column()
	userId: number;

	@ManyToOne(() => ChatEntity, ChatEntity => ChatEntity.chat_user)
	chat: ChatEntity;

	@ManyToOne(() => UserEntity, UserEntity => UserEntity.chat_user)
	user: UserEntity;

	@Column()
	message: string;
}