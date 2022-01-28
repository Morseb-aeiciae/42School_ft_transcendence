import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import { ChatEntity } from "./chat.entity";
import { UserEntity } from "./user.entity";

@Unique(["chat", "user"])
@Entity()
export class Chat_userEntity extends AbstractEntity {

	@Column()
	chatId: number;

	@Column()
	userId: number;

	@ManyToOne(() => ChatEntity, ChatEntity => ChatEntity.chat_user, { onDelete: 'CASCADE' })
	chat: ChatEntity;

	@ManyToOne(() => UserEntity, UserEntity => UserEntity.chat_user, { onDelete: 'CASCADE' })
	user: UserEntity;

	@Column({default: 3})
	adminlvl: number;

	@Column({default: false})
	banned: boolean;

	@Column({default: false})
	muted: boolean;
}