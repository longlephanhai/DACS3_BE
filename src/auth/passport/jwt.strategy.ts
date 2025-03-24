import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
  ) {
    // const secret = configService.get<string>('JWT_ACCESS_TOKEN_SECRET');
    // if (!secret) {
    //   throw new Error('JWT_ACCESS_TOKEN_SECRET is not defined in the environment variables.');
    // }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET') as string
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
