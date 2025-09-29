import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as config from '../../config';

export type JwtPayload = {
  sub: string;
  role: string;
  roleUID: string | undefined;
};

export const STRATEGY_TYPE = 'main-jwt-auth';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy, STRATEGY_TYPE) {
  constructor() {
    super({
      secretOrKey: config.JWT_KEY || '',
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate(payload: JwtPayload) {
    const userId = payload.sub;
    const roleUID = payload.roleUID;

    return { id: userId, roleUID: roleUID };
  }
}
