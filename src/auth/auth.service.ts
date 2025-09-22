import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  private users = [
    {
      userId: 1,
      username: 'admin',
      password: '$2b$10$B.8slEZ1iTM2nrlkphfMLuR5S2ty.oxhogiZqYEvNzqqn9gah/4am', 
    },
  ];



  async validateUser(username: string, pass: string): Promise<any> {

    const user = this.users.find(u => u.username === username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
