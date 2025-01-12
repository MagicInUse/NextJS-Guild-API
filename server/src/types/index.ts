interface BattleNetAPIResponse {
  _links: {
    self: { href: string };
  };
  guild: {
    name: string;
    id: number;
    realm: {
      slug: string;
      name: string;
    };
    faction: {
      type: string;
      name: string;
    };
    achievement_points: number;
    member_count: number;
  };
  members: Array<{
    character: {
      name: string;
      level: number;
      playable_class: {
        id: number;
        name: string;
      };
      realm: {
        slug: string;
      };
    };
    rank: number;
  }>;
}

interface BattleNetGuildResponse {
  _links: {
    self: { href: string };
  };
  guild: {
    name: string;
    id: number;
    realm: {
      slug: string;
      name: string;
    };
    faction: {
      type: string;
      name: string;
    };
    achievement_points: number;
    member_count: number;
  };
}

interface BattleNetInstance {
  WowGameData: {
    axios: import('axios').AxiosInstance;
  };
}

interface BattleNetTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface GuildMember {
  character: {
    name: string;
    level: number;
    class: string;
    realm: string;
  };
  rank: number;
}

interface GuildInfo {
  name: string;
  realm: string;
  faction: string;
  achievementPoints: number;  
  memberCount: number;
  members: GuildMember[];
}

export type { BattleNetAPIResponse, BattleNetGuildResponse, BattleNetInstance, BattleNetTokenResponse, GuildMember, GuildInfo };