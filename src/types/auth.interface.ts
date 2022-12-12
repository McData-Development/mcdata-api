export interface ITokenPayload {
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
}

export interface ITokenResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  scope: 'profile';
  state: string;
  data: {
    uuid: string;
    profile: {
      id: string;
      name: string;
      properties: {
        name: 'textures';
        value: string;
        signature: string;
      }[];
    };
  };
}
