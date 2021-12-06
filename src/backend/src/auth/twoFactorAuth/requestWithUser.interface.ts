import { Request } from 'express';
import { UserEntity } from 'src/entities/user.entity';

 
interface RequestWithUser extends Request {
  user: UserEntity;
}
 
export default RequestWithUser;