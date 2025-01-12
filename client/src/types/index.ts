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
      id: number;
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

export interface GuildMember {
  character: {
    name: string;
    level: number;
    class: string;
    realm: string;
  };
  rank: number;
}

export interface GuildInfo {
  name: string;
  realm: string;
  faction: string;
  achievementPoints: number;  
  memberCount: number;
  members: GuildMember[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: boolean;
}