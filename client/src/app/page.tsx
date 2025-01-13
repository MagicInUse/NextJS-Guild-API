'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import GuildAchievement from '@/components/GuildAchievement';
import { GuildInfo } from '@/types';

// HomePage component
const HomePage = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    
    // State to store guild information
    const [guildInfo, setGuildInfo] = useState<GuildInfo>({
        _links: { self: { href: '' } },
        id: 0,
        name: 'Loading...',
        realm: { name: 'Loading...', slug: '' },
        faction: { type: '', name: 'Loading...' },
        achievementPoints: 0,
        memberCount: 0,
        members: [],
        crest: {
          background: { color: '' },
          border: { media: { key: { href: '' } } },
          emblem: { media: { key: { href: '' } } }
        }
    });

    // State to store error messages
    const [error, setError] = React.useState<string | null>(null);
    
    // State to manage loading state
    const [loading, setLoading] = React.useState(true);

    // Fetch guild information on component mount
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/guild/info`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                
                // Debug log to inspect response
                console.log('API Response:', data);
    
                // Check if data is the guild object directly
                const guild = data.guild || data;
                
                if (!guild || !guild.name) {
                    throw new Error('Guild data not found or invalid');
                }
                
                // Update guild information state
                setGuildInfo({
                    _links: data._links || { self: { href: '' } },
                    id: guild.id || 0,
                    name: guild.name,
                    realm: guild.realm || { name: 'Unknown', slug: '' },
                    faction: guild.faction || { type: '', name: 'Unknown' },
                    achievementPoints: guild.achievement_points || 0,
                    memberCount: guild.member_count || 0,
                    members: data.members || [],
                    crest: guildInfo.crest
                });
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch guild info');
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);

    // Render loading spinner while fetching data
    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
        </div>;
    }

    // Render error message if there is an error
    if (error) {
        return <div className="text-red-500 text-center p-4">Error: {error}</div>;
    }

    // Render the main content
    return (
        <div>
            <Header />
            <main className="container mx-auto px-4">
                <GuildAchievement guildInfo={guildInfo} />
            </main>
        </div>
    );
};

export default HomePage;