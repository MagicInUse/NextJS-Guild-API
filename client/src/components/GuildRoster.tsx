import { GuildMember } from '../types';

interface GuildRosterProps {
  members: GuildMember[];
}

const GuildRoster: React.FC<GuildRosterProps> = ({ members }) => {
  if (!members?.length) {
    return <div className="text-center text-gray-500">No guild members found!</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {members.map((member) => (
        <div 
          key={member.character.name} 
          className="bg-slate-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
        >
          <h3 className="text-xl font-bold text-white mb-2">
            {member.character.name}
          </h3>
          <p className="text-gray-300">
            Level {member.character.level} {member.character.class}
          </p>
          <p className="text-gray-400 mt-2">
            Rank: {member.rank}
          </p>
        </div>
      ))}
    </div>
  );
};

export default GuildRoster;