import { GuildMember } from '@/types';

interface GuildRosterProps {
  members: GuildMember[];
}

const GuildRoster: React.FC<GuildRosterProps> = ({ members }) => {
  if (!members?.length) {
    return <div className="text-center text-gray-500">No guild members found!</div>;
  }

  return (
    <ul role="list" className="divide-y divide-gray-700">
      {members.map((member) => (
        <li key={member.character.name} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img 
              className="h-12 w-12 flex-none rounded-full bg-gray-800" 
              src="/images/wow-avatar-placeholder.png" 
              alt={member.character.name}
            />
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
            <p className="text-sm text-[#A335EE]">Rank: {member.rank}</p>
            <div className="mt-1 flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
              </div>
              <p className="text-xs text-gray-400">Online</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GuildRoster;