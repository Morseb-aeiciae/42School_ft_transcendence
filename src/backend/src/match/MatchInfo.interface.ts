import { UserEntity } from "src/entities/user.entity";

interface MatchsInfo {
    user_1: UserEntity;
    user_2: UserEntity;
    pts_1: number;
    pts_2: number;
    winner_1: boolean;
    winner_2: boolean;
}


export default MatchsInfo;