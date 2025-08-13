import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Simulated user
  private users = [
    {
      id: 1,
      username: 'admin',
      password: bcrypt.hashSync('admin123', 10), // password is "admin123"
    },
  ];

  async validateUser(username: string, password: string) {
    const user = this.users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

