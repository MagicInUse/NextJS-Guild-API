import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';
import { 
  BattleNetInstance, 
  BattleNetTokenResponse,
  BattleNetAPIResponse, 
  GuildMember
} from '../types';

dotenv.config();

class BattleNetService implements BattleNetInstance {
  private static instance: BattleNetService | null = null;
  private static accessToken: string | null = null;
  public axiosInstance: AxiosInstance;
  public WowGameData: {
    axios: AxiosInstance;
  };

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://us.api.blizzard.com',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.WowGameData = {
      axios: this.axiosInstance,
    };
  }

  private static async getOAuthToken(): Promise<string> {
    try {
      const formData = new URLSearchParams();
      formData.append('grant_type', 'client_credentials');

      const response = await axios.post<BattleNetTokenResponse>(
        'https://oauth.battle.net/token',
        formData,
        {
          auth: {
            username: process.env.BNET_CLIENT_ID!,
            password: process.env.BNET_CLIENT_SECRET!
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      return response.data.access_token;
    } catch (error) {
      console.error('OAuth Error:', error);
      throw error;
    }
  }

  public static async getInstance(): Promise<BattleNetService> {
    if (!BattleNetService.instance) {
      BattleNetService.instance = new BattleNetService();
      BattleNetService.accessToken = await BattleNetService.getOAuthToken();
      BattleNetService.instance.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${BattleNetService.accessToken}`;
    }
    return BattleNetService.instance;
  }

  public async getCharacterMedia(realm: string, characterName: string): Promise<any> {
    try {
      const response = await this.axiosInstance.get(
        `/profile/wow/character/${realm}/${characterName.toLowerCase()}/character-media`,
        {
          params: {
            namespace: 'profile-us',
            locale: 'en_US',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching character media for ${characterName} on ${realm}:`, error);
      throw error;
    }
  }

  public static async getGuildRoster(): Promise<GuildMember[]> {
    try {
      const api = await this.getInstance();
      console.log('Getting guild roster...');
      
      const response = await api.axiosInstance.get<BattleNetAPIResponse>(
        '/data/wow/guild/area-52/faded-legends/roster',
        {
          params: {
            namespace: 'profile-us',
            locale: 'en_US'
          }
        }
      );
  
      console.log('API Response:', {
        status: response.status,
        hasData: !!response.data,
        memberCount: response.data?.members?.length
      });
  
      if (!response?.data?.members) {
        throw new Error('Invalid guild roster response from Battle.net');
      }
  
      return response.data.members.map(member => ({
        character: {
          name: member.character.name,
          level: member.character.level,
          class: member.character.playable_class.name,
          realm: member.character.realm.slug
        },
        rank: member.rank
      }));
  
    } catch (error) {
      console.error('Guild roster error:', error);
      throw error;
    }
  }

  public static async getGuildProfile(): Promise<any> {
    try {
      const api = await this.getInstance();
      console.log('Getting guild profile...');
      
      const response = await api.axiosInstance.get<BattleNetAPIResponse>(
        '/data/wow/guild/area-52/faded-legends',
        {
          params: {
            namespace: 'profile-us',
            locale: 'en_US'
          }
        }
      );
  
      console.log('API Response:', {
        status: response.status,
        hasData: !!response.data
      });
  
      return response.data;
  
    } catch (error) {
      console.error('Guild profile error:', error);
      throw error;
    }
  }
}

export default BattleNetService;