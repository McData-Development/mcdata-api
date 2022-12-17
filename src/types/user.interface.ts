export interface IAvailableUserProperties {
  badges?: {
    connect: { id: string | undefined }[];
    disconnect: { id: string | undefined }[];
  };
}
