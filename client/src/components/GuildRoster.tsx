"use client";

import React, { useEffect, useState } from 'react';
import { GuildMember } from '@/types';
import { fetchAvatars } from '@/utils/fetchAvatars';
import { getRankName } from '@/utils/rankUtils';

// Define the props for the GuildRoster component
interface GuildRosterProps {
  members: GuildMember[];
}

// Define the GuildRoster component
const GuildRoster: React.FC<GuildRosterProps> = ({ members }) => {
  // State to store avatars of guild members
  const [avatars, setAvatars] = useState<{ [key: string]: string }>({});

  // Fetch avatars when the component mounts or members change
  useEffect(() => {
    const getAvatars = async () => {
      try {
        const fetchedAvatars = await fetchAvatars(members);
        setAvatars(fetchedAvatars);
      } catch (error) {
        console.error('Error fetching avatars:', error);
      }
    };

    getAvatars();
  }, [members]);

  // If there are no members, display a message
  if (!members?.length) {
    return <div className="text-center text-gray-500">No guild members found!</div>;
  }

  // Render the list of guild members
  return (
    <ul role="list" className="divide-y divide-gray-700">
      {members.map((member) => (
        <li key={member.character.name} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            {avatars[member.character.name] ? (
              // Display avatar if available
              <img 
                className="h-12 w-12 flex-none rounded-full bg-gray-800" 
                src={avatars[member.character.name]} 
                alt={member.character.name}
              />
            ) : (
              // Display placeholder if avatar is not available
              <div className="profile-placeholder">
                {member.character.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold text-[#FF8000]">
                {member.character.name}
              </p>
              <p className="mt-1 truncate text-xs text-gray-400">
                Level {member.character.level} {member.character.class}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm text-[#A335EE]">Rank: {getRankName(member.rank)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GuildRoster;