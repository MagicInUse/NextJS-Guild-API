export const getRankName = (rank: number): string => {
    switch (rank) {
      case 0:
        return "The Man Himself";
      case 1:
        return "Chip";
      case 2:
        return "Fried Potato";
      case 3:
        return "Baked Potato";
      case 4:
        return "Raw Potato";
      default:
        return "Unknown Rank";
    }
  };