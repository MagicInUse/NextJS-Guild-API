import { GuildMember } from '@/types';
import GuildRoster from '@/components/GuildRoster';
import { staticRoster } from '@/data/StaticRoster';
import RosterClient from '@/components/RosterClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getGuildMembers(): Promise<GuildMember[]> {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return staticRoster;
  }

  try {
    const response = await fetch(`${API_URL}/api/guild/roster`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Invalid response format');
    }
    
    return data;
  } catch (error) {
    console.error('Failed to fetch guild members:', error);
    throw error;
  }
}

export default function RosterPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Guild Roster</h1>
      <RosterClient />
    </div>
  );
}

async function AsyncRoster() {
  try {
    const members = await getGuildMembers();
    if (!members?.length) {
      return <div className="text-center text-gray-500">No members found</div>;
    }
    return <GuildRoster members={members} />;
  } catch (error) {
    console.error('Roster error:', error);
    return (
      <div className="text-center text-red-500 p-4">
        <p className="font-bold">Error loading guild roster</p>
      </div>
    );
  }
}