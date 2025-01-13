import { Request, Response } from 'express';
import BattleNetService from '../services/battlenetService';

// Controller function to get the guild profile
export const getGuildProfile = async (req: Request, res: Response) => {
  try {
    // Fetch the guild profile using the BattleNetService
    const profile = await BattleNetService.getGuildProfile();
    
    // Check if the profile data is valid
    if (!profile) {
      throw new Error('Invalid guild profile data received');
    }
    
    // Send the profile data as a JSON response
    res.json(profile);
  } catch (error) {
    // Log the error and send a 500 status with an error message
    console.error('Guild profile error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch guild profile',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Controller function to get the guild roster
export const getGuildRoster = async (req: Request, res: Response) => {
  try {
    // Fetch the guild roster using the BattleNetService
    const roster = await BattleNetService.getGuildRoster();
    
    // Check if the roster data is valid and is an array
    if (!roster || !Array.isArray(roster)) {
      throw new Error('Invalid roster data received');
    }
    
    // Send the roster data as a JSON response
    res.json(roster);
  } catch (error) {
    // Log the error and send a 500 status with an error message
    console.error('Guild roster error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch guild roster',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};