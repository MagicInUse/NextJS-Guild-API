import React from 'react';

interface PlayerCardProps {
    name: string;
    armoryLink: string;
    className: string;
    level: number;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ name, armoryLink, className, level }) => {
    return (
        <div className="player-card">
            <h3>{name}</h3>
            <p>Class: {className}</p>
            <p>Level: {level}</p>
            <a href={armoryLink} target="_blank" rel="noopener noreferrer">View Armory</a>
        </div>
    );
};

export default PlayerCard;