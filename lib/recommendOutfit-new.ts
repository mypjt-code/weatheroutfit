import type { Purpose, RecommendationResult, WeatherData, OutfitItem } from "@/types";

const colorOptions = [
  "라이트 블루",
  "아이보리",
  "베이지",
  "라벤더",
  "코랄",
  "민트",
  "핑크",
];

const purposeOutfitMap: Record<Purpose, string[]> = {
  출근: ["셔츠", "슬랙스", "로퍼", "자켓"],
  데이트: ["원피스", "니트", "스커트", "깔끔한 아우터"],
  "육아/등하원": ["맨투맨", "조거팬츠", "운동화", "바람막이"],
  운동: ["기능성 티셔츠", "레깅스", "트레이닝복"],
  산책: ["편한 티셔츠", "가디건", "운동화"],
  "격식 있는 자리": ["블라우스", "슬랙스", "자켓", "구두"],
  여행: ["편한 바지", "레이어드", "걷기 좋은 신발"],
};

const outfitDescriptions: Record<string, string> = {
  셔츠: "깔끔하고 정갈한 분위기",
  슬랙스: "세련되고 편안한 핏",
  로퍼: "우아하고 자연스러운 풍격",
  자켓: "세련되고 따뜻한 아우터",
  원피스: "우아하고 매력적인 스타일",
  니트: "편안하고 따뜻한 스웨터",
  스커트: "세련되고 부드러운 실루엣",
  "깔끔한 아우터": "균형잡힌 외출 복장",
  맨투맨: "편안하고 활동적인 상의",
  조거팬츠: "편하고 실용적인 바지",
  운동화: "편하고 실용적인 신발",
  "바람막이": "기능성 있는 가벼운 아우터",
  "기능성 티셔츠": "통풍성 좋은 활동복",
  레깅스: "편한 착용감의 하의",
  트레이닝복: "운동하기 좋은 복장",
  "편한 티셔츠": "캐주얼하고 편한 상의",
  가디건: "겹겹이 입기 좋은 니트",
  블라우스: "격식 있는 정장 상의",
  구두: "공식적인 하단 신발",
  "편한 바지": "여행 가기 좋은 바지",
  레이어드: "여러 겹으로 입기 좋은 스타일",
  "걷기 좋은 신발": "편한 도보 신발",
  우산: "강우 시 필수 준비물",
  "방수 신발": "습한 날씨 대비 신발",
  바지: "바람이 강할 때 권장",
  "미끄럼 방지 신발": "눈길 대비 신발",
  패딩: "추운 날씨 대비 아우터",
  목도리: "목 부위 온기 보존",
  장갑: "손 부위 온기 보존",
  코트: "따뜻한 겨울 외투",
  "두꺼운 니트": "따뜻한 두터운 스웨터",
  "패딩조끼": "조절 가능한 따뜻함",
  린넨: "가볍고 통풍성 좋은 소재",
  "얇은 원피스": "시원한 여름 원피스",
  샌들: "개방감 있는 신발",
  "반팔": "시원한 반팔 상의",
  "얇은 셔츠": "가벼운 커버용 상의",
  "얇은 가디건": "가벼운 외출복",
  긴팔: "자외선 방지 상의",
  "얇은 자켓": "가벼운 보온 아우터",
  "트렌치코트": "세련된 스프링 코트",
};

const searchUrl = (base: string, query: string) =>
  `${base}${encodeURIComponent(query)}`;

const buildShoppingLinks = (item: string) => ({
  naver: searchUrl("https://search.shopping.naver.com/search/all?query=", item),
  musinsa: searchUrl("https://www.musinsa.com/search/musinsa/integration?q=", item),
  coupang: searchUrl("https://www.coupang.com/np/search?q=", item),
});

const pickRandomColor = () => {
  const index = Math.floor(Math.random() * colorOptions.length);
  return colorOptions[index];
};

const dedupeItems = (items: string[]) => Array.from(new Set(items));

const tempBasedOutfit = (temp: number): string[] => {
  if (temp >= 28) {
    return ["반팔", "린넨", "얇은 원피스", "샌들"];
  }
  if (temp >= 23) {
    return ["반팔", "얇은 셔츠", "얇은 가디건"];
  }
  if (temp >= 17) {
    return ["긴팔", "셔츠", "가디건", "얇은 자켓"];
  }
  if (temp >= 10) {
    return ["니트", "자켓", "트렌치코트"];
  }
  if (temp >= 5) {
    return ["코트", "두꺼운 니트", "패딩조끼"];
  }
  return ["패딩", "목도리", "장갑"];
};

export const recommendOutfit = (
  weather: WeatherData,
  purpose: Purpose,
  height?: number,
  weight?: number
): RecommendationResult => {
  const baseItems = tempBasedOutfit(weather.temp);
  const purposeItems = purposeOutfitMap[purpose] ?? [];
  const outfitItems = dedupeItems([...baseItems, ...purposeItems]);

  const weatherHighlights: string[] = [
    `${weather.city} 오늘 기온 ${weather.temp}°C, 체감 ${weather.feelsLike}°C`,
    `${weather.precipitation}% 강수확률`,
    `날씨: ${weather.condition}, 바람: ${weather.wind}`,
  ];

  const adjustments: string[] = [];

  if (weather.precipitation >= 30) {
    adjustments.push("우산", "방수 신발");
  }

  if (weather.wind.includes("강")) {
    adjustments.push("바지", "바람막이");
  }

  if (weather.condition.includes("눈")) {
    adjustments.push("미끄럼 방지 신발", "패딩");
  }

  const weatherItems = dedupeItems([...outfitItems, ...adjustments]);

  const fitAdviceParts: string[] = [
    "오늘은 균형감 있게 편안한 핏을 추천합니다.",
  ];

  if (typeof height === "number") {
    if (height <= 160) {
      fitAdviceParts.push(
        "하이웨이스트와 짧은 자켓, 세로 라인 아이템이 잘 어울립니다."
      );
      weatherHighlights.push("키가 160cm 이하인 경우, 세로 라인과 경쾌한 실루엣 추천");
    } else if (height >= 170) {
      fitAdviceParts.push("롱코트와 와이드 팬츠로 여유로운 실루엣을 즐겨보세요.");
      weatherHighlights.push("키가 170cm 이상인 경우, 롱코트와 와이드 팬츠 추천");
    }
  }

  if (typeof weight === "number") {
    fitAdviceParts.push(
      "라인을 살리면서도 편안한 핏을 유지하는 스타일이 좋습니다."
    );
  }

  const dayColor = pickRandomColor();

  const outfitItemsWithDetails: OutfitItem[] = weatherItems.map((item, idx) => ({
    id: `outfit-${idx}`,
    name: item,
    description: outfitDescriptions[item] || "추천 아이템",
    links: buildShoppingLinks(item),
  }));

  const shoppingItems = weatherItems.map((item) => ({
    item,
    links: buildShoppingLinks(item),
  }));

  const summary = `오늘은 ${dayColor} 톤을 포인트로 한 편안하고 세련된 코디를 추천합니다.`;

  return {
    city: weather.city,
    dayColor,
    summary,
    weatherHighlights,
    fitAdvice: fitAdviceParts.join(" "),
    outfitItems: outfitItemsWithDetails,
    shoppingItems,
  };
};
