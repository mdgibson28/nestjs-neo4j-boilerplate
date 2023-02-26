import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', expiresIn: '1d' }),
  ],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
