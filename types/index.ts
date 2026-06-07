export type Purpose =
  | "출근"
  | "데이트"
  | "육아/등하원"
  | "운동"
  | "산책"
  | "격식 있는 자리"
  | "여행";

export interface WeatherData {
  city: string;
  temp: number;
  feelsLike: number;
  precipitation: number;
  condition: string;
  wind: string;
  airQuality: string;
  source?: "kma" | "mock";
}

export interface ShoppingLinkSet {
  naver: string;
  musinsa: string;
  coupang: string;
}

export interface ShoppingItem {
  item: string;
  links: ShoppingLinkSet;
}

export interface OutfitItem {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  links: ShoppingLinkSet;
}

export interface RecommendationResult {
  city: string;
  dayColor: string;
  summary: string;
  weatherHighlights: string[];
  fitAdvice: string;
  outfitItems: OutfitItem[];
  shoppingItems: ShoppingItem[];
}

export interface WeatherData {
  city: string;
  temp: number;
  feelsLike: number;
  precipitation: number;
  condition: string;
  wind: string;
  airQuality: string;
  source?: "kma" | "mock";
}
