export interface IMostCollectedGame {
  gameId: number;
  platformId: string;
  game_name: string;
  platform_name: string;
  collection_count: bigint | number;
}
