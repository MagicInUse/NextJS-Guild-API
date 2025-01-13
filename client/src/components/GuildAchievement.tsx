import { GuildInfo } from '@/types';

interface GuildAchievementProps {
  guildInfo?: GuildInfo;
}

const GuildAchievement: React.FC<GuildAchievementProps> = ({ guildInfo }) => {
  // Helper function to safely display faction
  const getFactionDisplay = (faction: any): string => {
    if (typeof faction === 'object' && faction !== null) {
      return faction.name || 'Unknown';
    }
    return String(faction || 'Unknown');
  };

  return (
    <div className="max-w-2xl mx-auto my-4">
      <div className="bg-gradient-to-r from-[#2B2B2B] to-[#1F1F1F] border-2 border-[#4A4A4A] rounded-lg p-4 relative overflow-hidden">
        {/* Achievement Icon */}
        <div className="absolute top-0 left-0 w-16 h-16 m-4">
          <div className="w-full h-full rounded-full bg-[#2B2B2B] border-2 border-[#FFC125] flex items-center justify-center">
            <img 
              src="/images/guild-achievement.png" 
              alt="Guild Achievement"
              className="w-12 h-12"
            />
          </div>
        </div>

        {/* Achievement Content */}
        <div className="ml-24">
          {/* <h2 className="text-[#FFC125] text-xl font-warcraft">
            {typeof guildInfo?.name === 'string' ? guildInfo.name : 'Loading...'}
          </h2> */}
          
          <div className="text-gray-300 mt-2 space-y-1">
            <p className="flex items-center gap-2">
              <span className="text-[#FFB100]">Realm:</span> 
              {typeof guildInfo?.realm.name === 'string' ? guildInfo.realm.name : 'Loading...'}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#FFB100]">Faction:</span> 
              <span className={`${
                getFactionDisplay(guildInfo?.faction) === 'Alliance' ? 'text-[#0078FF]' : 'text-[#FF0000]'
              }`}>
                {getFactionDisplay(guildInfo?.faction)}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#FFB100]">Members:</span> 
              {typeof guildInfo?.memberCount === 'number' ? guildInfo.memberCount : '0'}
            </p>
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