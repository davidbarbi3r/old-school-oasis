export interface IIgdbAuth {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export const igdbRegionsMap = {
  1: 'Europe',
  2: 'North America',
  3: 'Australia',
  4: 'New Zealand',
  5: 'Japan',
  6: 'China',
  7: 'Asia',
  8: 'Worldwide',
};
