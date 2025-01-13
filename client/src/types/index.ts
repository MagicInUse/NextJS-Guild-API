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


export interface GuildCrestRGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface GuildCrestMedia {
  key: { href: string };
  id: number;
}

export interface GuildCrestElement {
  id: number;
  media?: GuildCrestMedia;
  color: {
    id: number;
    rgba: GuildCrestRGBA;
  };
}

export interface GuildCrest {
  emblem: GuildCrestElement;
  border: GuildCrestElement;
  background: {
    color: {
      id: number;
      rgba: GuildCrestRGBA;
    };
  };
}

export interface Realm {
  name: string;
  slug: string;
}

export interface GuildInfo {
  _links: {
    self: {
      href: string;
    };
  };
  id: number;
  name: string;
  realm: Realm;
  faction: {
    type: string;
    name: string;
  };
  achievementPoints: number;
  memberCount: number;
  members: any[];
  crest: {
    background: {
      color: string;
    };
    border: {
      media: {
        key: {
          href: string;
        };
      };
    };
    emblem: {
      media: {
        key: {
          href: string;
        };
      };
    };
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: boolean;
}