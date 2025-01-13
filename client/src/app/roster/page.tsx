import { GuildMember } from '@/types';
import GuildRoster from '@/components/GuildRoster';
import { staticRoster } from '@/data/StaticRoster';
import RosterClient from '@/components/RosterClient';

// Define the API URL, defaulting to localhost if not set in environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Function to fetch guild members from the API or return static data during production build
async function getGuildMembers(): Promise<GuildMember[]> {
  // Return static data during production build
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return staticRoster;
  }

  try {
    // Fetch guild members from the API
    const response = await fetch(`${API_URL}/api/guild/roster`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Throw an error if the response is not ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse the response data
    const data = await response.json();
    
    // Validate the response format
    if (!Array.isArray(data)) {
      throw new Error('Invalid response format');
    }
    
    return data;
  } catch (error) {
    // Log and rethrow the error if fetching fails
    console.error('Failed to fetch guild members:', error);
    throw error;
  }
}

// Main component for the roster page
export default function RosterPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Guild Roster</h1>
      <RosterClient />
    </div>
  );
}

// Async function to fetch and display the guild roster
async function AsyncRoster() {
  try {
    // Fetch guild members
    const members = await getGuildMembers();
    
    // Display a message if no members are found
    if (!members?.length) {
      return <div className="text-center text-gray-500">No members found</div>;
    }
    
    // Render the guild roster component with the fetched members
    return <GuildRoster members={members} />;
  } catch (error) {
    // Log the error and display an error message
    console.error('Roster error:', error);
    return (
      <div className="text-center text-red-500 p-4">
        <p className="font-bold">Error loading guild roster</p>
      </div>
    );
  }
}