import { IsBoolean, IsNumber } from "class-validator";
import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract-entity";

@Entity()
export class FriendsEntity extends AbstractEntity {

    @Column()
    userId: number;

    @Column()
    targetId: number;

    @Column({default: false})
    is_friend: boolean;



}