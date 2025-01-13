import { AxiosInstance } from 'axios';
import { 
  BattleNetInstance, 
  BattleNetTokenResponse,
  BattleNetAPIResponse, 
  GuildMember
} from '../types';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

class BattleNetService {
  private static instance: BattleNetInstance | null = null;
  private static accessToken: string | null = null;

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

  static async getInstance(): Promise<BattleNetInstance> {
    try {
      if (!this.instance || !this.accessToken) {
        this.accessToken = await this.getOAuthToken();
        
        const axiosInstance = axios.create({
          baseURL: 'https://us.api.blizzard.com',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        this.instance = {
          WowGameData: {
            axios: axiosInstance
          }
        };
      }
      return this.instance;
    } catch (error) {
      console.error('Client init error:', error);
      throw error;
    }
  }

  static async getGuildRoster(): Promise<GuildMember[]> {
    try {
      const api = await this.getInstance();
      console.log('Getting guild roster...');
      
      const response = await api.WowGameData.axios.get<BattleNetAPIResponse>(
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

  static async getGuildProfile(): Promise<any> {
    try {
      const api = await this.getInstance();
      console.log('Getting guild profile...');
      
      const response = await api.WowGameData.axios.get<BattleNetAPIResponse>(
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