import axios from 'axios';

export const fetchAvatars = async (members: { character: { name: string } }[]) => {
  try {
    const response = await axios.post('/api/guild/fetchAvatars', { members });
    return response.data;
  } catch (error) {
    console.error('Error fetching avatars:', error);
    throw error;
  }
};