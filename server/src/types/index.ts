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
  _links: {
    self: { href: string };
  };
  id: number;
  name: string;
  realm: {
    name: string;
    slug: string;
  };
  faction: {
    type: string;
    name: string;
  };
  achievementPoints: number;  // Maps to guild.achievement_points
  memberCount: number;        // Maps to guild.member_count
  members: GuildMember[];
  crest: {
    emblem: {
      id: number;
      media: string;
      color: string;
    };
    border: {
      id: number;
      media: string;
      color: string;
    };
    background: {
      color: string;
    };
  };
}

export type { BattleNetAPIResponse, BattleNetInstance, BattleNetTokenResponse, GuildMember, GuildInfo };