export interface GridCoordinates {
  nx: number;
  ny: number;
}

export const locationGridMap: Record<string, GridCoordinates> = {
  판교: { nx: 62, ny: 123 },
  성남: { nx: 63, ny: 124 },
  서울: { nx: 60, ny: 127 },
  부산: { nx: 98, ny: 76 },
  대전: { nx: 67, ny: 100 },
  대구: { nx: 89, ny: 90 },
  광주: { nx: 58, ny: 74 },
  인천: { nx: 55, ny: 124 },
  울산: { nx: 102, ny: 84 },
  청주: { nx: 69, ny: 106 },
  전주: { nx: 63, ny: 89 },
  포항: { nx: 102, ny: 97 },
  논산: { nx: 68, ny: 100 },
  제주: { nx: 52, ny: 38 },
};

export const getGridCoordinates = (location: string): GridCoordinates => {
  const normalized = location.trim();
  return locationGridMap[normalized] ?? locationGridMap["서울"];
};

export const getLocationName = (location: string): string => {
  const normalized = location.trim();
  return normalized in locationGridMap ? normalized : "서울";
};
