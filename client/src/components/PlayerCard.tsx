import React from 'react';

// Define the props interface for the PlayerCard component
interface PlayerCardProps {
    name: string; // The name of the player
    armoryLink: string; // The URL to the player's armory
    className: string; // The class of the player
    level: number; // The level of the player
}

// Define the PlayerCard functional component
const PlayerCard: React.FC<PlayerCardProps> = ({ name, armoryLink, className, level }) => {
    return (
        // Container for the player card
        <div className="player-card">
            {/* Display the player's name */}
            <h3>{name}</h3>
            {/* Display the player's class */}
            <p>Class: {className}</p>
            {/* Display the player's level */}
            <p>Level: {level}</p>
            {/* Link to the player's armory, opens in a new tab */}
            <a href={armoryLink} target="_blank" rel="noopener noreferrer">View Armory</a>
        </div>
    );
};

// Export the PlayerCard component as the default export
export default PlayerCard;