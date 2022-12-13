export interface IPlayerProfileResponse {
  id: string;
  name: string;
  properties: {
    name: 'textures';
    value: string;
    signature: string;
  }[];
}

export interface IPlayerProfile {
  id: string;
  name: string;
}
