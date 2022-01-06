import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { response, urlencoded } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './strategy/jwt.strategy';
import TokenPayload from './token.payload.interface';

export interface RegistrationStatus {  
    success: boolean;  
    message: string;
}

@Injectable()
export class AuthService {
    configService: any;
    constructor(  private jwtService: JwtService,
        private userService : UserService) {}
    
		async validateUser(payload: JwtPayload) {
			const user = await this.userService.findByUsername(payload.username);    
			if (!user) {
				throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
			}
			return user;  
		}

		async register(username: string, mail: string): 
Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
        success: true,   
        message: 'user registered',
    };
    try {
        await this.userService.createUser(username, mail);
    } catch (err) {
        status = {
            success: false,        
            message: err,
        };    
    }
    return status;
}

		async login(username :string, mail: string): Promise<any> {    
			// find user in db    
			let user = await this.userService.findByUsername(username);
			if (user == undefined)
			{
				user = await this.userService.createUser(username, mail);
			}
			// generate and sign token    
			const token = this._createToken(user.username);
		
			const tab = {username, token};
			tab.username = username;
			tab.token = token;
			/*return {
				username: user.username, ...token,    
			};  */
			console.log(tab);
			return tab;
		}
		
		private _createToken( username : string): any {
			const user: JwtPayload = { username };    
			const accessToken = this.jwtService.sign(user);    
			return {
				expiresIn: 3600,
				accessToken,
			};  
		}
		

   async addUser(username : string, mail : string) {
      // console.log(mail);
        let user = await this.userService.findByUsername(username);
        if (user == undefined)
        {
           let test = await this.userService.createUser(username, mail);
		   return test;
        }
        return user;
    }

    findUser() {
        throw new Error("dfsdf")
    }

    public getCookieWithJwtAccessToken(userId: number, isSecondFactorAuthenticated = false) {
        const payload: TokenPayload = { userId, isSecondFactorAuthenticated };
        const token = this.jwtService.sign(payload, {
          secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    
        });
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
      }
}

