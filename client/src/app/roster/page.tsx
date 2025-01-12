// Force dynamic rendering
export const dynamic = 'force-dynamic';

import { GuildMember } from '@/types';
import GuildRoster from '@/components/GuildRoster';
import { Suspense } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getGuildMembers(retries = 3): Promise<GuildMember[]> {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempt ${i + 1} to fetch guild members`);
      
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
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Failed to fetch after retries');
}

export default async function RosterPage() {
  const members = await getGuildMembers();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Guild Roster</h1>
      <Suspense fallback={
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
        </div>
      }>
        {!members?.length ? (
          <div className="text-center text-gray-500">No members found</div>
        ) : (
          <GuildRoster members={members} />
        )}
      </Suspense>
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