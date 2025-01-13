import { Request, Response } from 'express';
import BattleNetService from '../services/battlenetService';

export const getGuildProfile = async (req: Request, res: Response) => {
  try {
    const profile = await BattleNetService.getGuildProfile();
    if (!profile) {
      throw new Error('Invalid guild profile data received');
    }
    res.json(profile);
  } catch (error) {
    console.error('Guild profile error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch guild profile',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export const getGuildRoster = async (req: Request, res: Response) => {
  try {
    const roster = await BattleNetService.getGuildRoster();
    if (!roster || !Array.isArray(roster)) {
      throw new Error('Invalid roster data received');
    }
    res.json(roster);
  } catch (error) {
    console.error('Guild roster error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch guild roster',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};