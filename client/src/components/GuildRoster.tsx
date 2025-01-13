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
  const [avatars, setAvatars] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 5;

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

  // Calculate the members to display based on the current page
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // If there are no members, display a message
  if (!members?.length) {
    return <div className="text-center text-gray-500">No guild members found!</div>;
  }

  // Calculate the total number of pages
  const totalPages = Math.ceil(members.length / membersPerPage);

  // Calculate the range of page buttons to display
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage < maxPageButtons - 1) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  // Render the list of guild members
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-700">
        {currentMembers.map((member) => (
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
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 mx-1 rounded bg-blue-300 text-black"
          disabled={currentPage === 1}
        >
          First
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <button
            key={startPage + index}
            onClick={() => handlePageChange(startPage + index)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === startPage + index ? (index % 2 === 0 ? 'bg-red-500 text-white' : 'bg-blue-500 text-white') : 'bg-gray-300 text-black'}`}
            >
            {startPage + index}
            </button>
        ))}
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 mx-1 rounded bg-red-300 text-black"
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => window.location.href = '/'}
          className="nav-button text-xl hover:text-[#FF8000] text-[#A335EE] transition-colors"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default GuildRoster;