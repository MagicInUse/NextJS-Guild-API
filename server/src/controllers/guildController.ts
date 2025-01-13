import { Request, Response } from 'express';
import BattleNetService from '../services/battlenetService';
import { getAvatarUrl } from '../utils/avatarUtils'; // Ensure this import is correct

// Controller function to get the guild profile
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
};

// Controller function to get the guild roster
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

// Controller function to fetch avatars
export const fetchAvatarsHandler = async (req: Request, res: Response) => {
  const { members } = req.body;

  if (!members) {
    return res.status(400).json({ error: 'Members are required' });
  }

  try {
    const avatars: { [key: string]: string } = {};
    const battleNetInstance = await BattleNetService.getInstance();

    for (const member of members) {
      try {
        const data = await battleNetInstance.getCharacterMedia('area-52', member.character.name);
        const avatar = getAvatarUrl(data);
        if (avatar) {
          avatars[member.character.name] = avatar;
        }
      } catch (error) {
        console.error(`Error fetching avatar for ${member.character.name}:`, error);
      }
    }

    res.status(200).json(avatars);
  } catch (error) {
    console.error('Error fetching avatars:', error);
    res.status(500).json({ error: 'Failed to fetch avatars' });
  }
};