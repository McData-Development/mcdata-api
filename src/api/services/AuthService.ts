import type { ITokenPayload, ITokenResponse, ITokenResponseRaw } from '../../types/auth.interface';
import { McAuthApi } from '../../utils/Axios';

class AuthService {
  /**
   * Identify code sent from oauth2 application
   */
  public async IdentifyCode(payload: ITokenPayload): Promise<ITokenResponse> {
    const { data } = await McAuthApi.post<ITokenResponseRaw>('/oauth2/token', {
      client_id: payload.clientId,
      client_secret: payload.clientSecret,
      code: payload.code,
      redirect_uri: payload.redirectUri,
      grant_type: 'authorization_code'
    });

    return {
      ...data,
      state: JSON.parse(data.state)
    };
  }
}

export default AuthService;
