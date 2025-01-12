import { Request, Response } from 'express';
import BattleNetService from '../services/battlenetService';

export const getGuildProfile = async (req: Request, res: Response) => {
  try {
    const info = await BattleNetService.getGuildInfo();
    if (!info) {
      return res.status(404).json({ 
        error: 'Guild information not found',
        details: 'The guild information could not be retrieved'
      });
    }
    res.json({ data: info });
  } catch (error) {
    console.error('Guild info error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch guild info',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

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