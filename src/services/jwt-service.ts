import {HttpErrors} from '@loopback/rest';
import {UserProfile} from "@loopback/security";
import {promisify} from 'util';
const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);

export class JWTService {
  async generateToken(UserProfile: UserProfile): Promise<string> {

    if (!UserProfile) {
      throw new HttpErrors.Unauthorized(
        'Error while generatung token: userprofile is null',
      );
    }
    let token = '';
    try {
      token = await signAsync(UserProfile, '123asdf5', {
        expiresIn: '7h',
      });
    } catch (err) {
      throw new HttpErrors.Unauthorized(`error generating token ${err}`);

    }
    return token;

  }
}
