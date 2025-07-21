import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService, JwtPayload } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRETKEY!,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
