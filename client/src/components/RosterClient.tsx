'use client';

import { useState, useEffect } from 'react';
import { GuildMember } from '@/types';
import GuildRoster from './GuildRoster';

// Define the API URL, defaulting to localhost if not provided
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function RosterClient() {
  // State to store guild members
  const [members, setMembers] = useState<GuildMember[]>([]);
  // State to handle loading status
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState<string | null>(null);

  // useEffect to fetch guild members when the component mounts
  useEffect(() => {
    fetch(`${API_URL}/api/guild/roster`)
      .then(res => res.json())
      .then(data => {
        // Set the members state with the fetched data
        setMembers(data);
        // Set loading to false as data is fetched
        setLoading(false);
      })
      .catch(err => {
        // Set error state if there is an error
        setError(err.message);
        // Set loading to false as fetching is complete
        setLoading(false);
      });
  }, []);

  // Show a loading spinner while data is being fetched
  if (loading) {
    return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>;
  }

  // Show an error message if there is an error
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  // Render the GuildRoster component with the fetched members
  return <GuildRoster members={members} />;
}