'use client';

import { useState, useEffect } from 'react';
import { GuildMember } from '@/types';
import GuildRoster from './GuildRoster';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function RosterClient() {
  const [members, setMembers] = useState<GuildMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/guild/roster`)
      .then(res => res.json())
      .then(data => {
        setMembers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return <GuildRoster members={members} />;
}