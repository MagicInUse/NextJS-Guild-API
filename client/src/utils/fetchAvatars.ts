const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const fetchAvatars = async (members: { character: { name: string } }[]) => {
  try {
    console.log('Fetching avatars from:', `${API_URL}/api/guild/fetchAvatars`);
    console.log('Members:', members);

    const response = await fetch(`${API_URL}/api/guild/fetchAvatars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ members }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching avatars:', error);
    throw error;
  }
};