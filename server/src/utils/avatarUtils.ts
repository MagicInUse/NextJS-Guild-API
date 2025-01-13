export const getAvatarUrl = (data: any): string | null => {
    const avatar = data.assets.find((asset: any) => asset.key === 'avatar');
    return avatar ? avatar.value : null;
  };