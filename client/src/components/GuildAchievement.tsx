import { GuildInfo } from '@/types';

// Interfaces for the crest media and parts
interface CrestMedia {
  key: {
    href: string;
  };
}

interface CrestPart {
  media: CrestMedia;
}

interface Crest {
  background: {
    color: string;
  };
  border: CrestPart;
  emblem: CrestPart;
}

// Props interface for the GuildAchievement component
interface GuildAchievementProps {
  guildInfo: GuildInfo;
}

// GuildAchievement component
const GuildAchievement: React.FC<GuildAchievementProps> = ({ guildInfo }) => {
  // Helper function to safely display faction
  const getFactionDisplay = (faction: any): string => {
    if (typeof faction === 'object' && faction !== null) {
      return faction.name || 'Unknown';
    }
    return String(faction || 'Unknown');
  };

  // Function to render the guild crest based on faction
  const renderGuildCrest = () => {
    const faction = getFactionDisplay(guildInfo?.faction);
    const crestUrl =
      faction === 'Alliance'
        ? 'https://images.freeimages.com/fic/images/icons/1181/flurry_extras_2/256/alliance.png?fmt=webp&w=500'
        : 'https://images.freeimages.com/fic/images/icons/1181/flurry_extras_2/256/horde.png?fmt=webp&h=350';

    return <img src={crestUrl} alt={`${faction} crest`} className="w-full h-full object-contain" />;
  };

  return (
    <div className="max-w-2xl mx-auto my-4">
      <div className="bg-gradient-to-r from-[#2B2B2B] to-[#1F1F1F] border-2 border-[#4A4A4A] rounded-lg p-4 relative overflow-hidden">
        {/* Achievement Icon */}
        <div className="absolute top-0 left-0 w-32 h-32 m-4">
          {renderGuildCrest()}
        </div>

        {/* Achievement Content */}
        <div className="ml-40">
          {/* Guild Name */}
          {/* <h2 className="text-[#FFC125] text-xl font-warcraft">
            {typeof guildInfo?.name === 'string' ? guildInfo.name : 'Loading...'}
          </h2> */}
          
          <div className="text-gray-300 mt-2 space-y-1">
            {/* Realm Name */}
            <p className="flex items-center gap-2">
              <span className="text-[#FFB100]">Realm:</span> 
              {typeof guildInfo?.realm.name === 'string' ? guildInfo.realm.name : 'Loading...'}
            </p>
            {/* Faction */}
            <p className="flex items-center gap-2">
              <span className="text-[#FFB100]">Faction:</span> 
              <span className={`${
                getFactionDisplay(guildInfo?.faction) === 'Alliance' ? 'text-[#0078FF]' : 'text-[#FF0000]'
              }`}>
                {getFactionDisplay(guildInfo?.faction)}
              </span>
            </p>
            {/* Member Count */}
            <p className="flex items-center gap-2">
              <span className="text-[#FFB100]">Members:</span> 
              {typeof guildInfo?.memberCount === 'number' ? guildInfo.memberCount : '0'}
            </p>
            {/* Achievement Points */}
            <p className="flex items-center gap-2">
              <span className="text-[#FFB100]">Achievement Points:</span>
              <span className="text-[#FFC125]">
                {typeof guildInfo?.achievementPoints === 'number' ? guildInfo.achievementPoints : '0'}
              </span>
            </p>
          </div>
        </div>

        {/* Achievement Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-yellow-400/5 to-transparent opacity-25"></div>
      </div>
    </div>
  );
};

export default GuildAchievement;