// import { Injectable } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import passport from 'passport';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {}
// exports.userAuth = passport.authenticate('jwt', { session: false });

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
