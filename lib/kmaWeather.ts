import type { WeatherData } from "@/types";
import { getGridCoordinates } from "@/lib/locationGrid";

const getBaseDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const baseDate = `${year}${month}${date}`;

  const hours = now.getHours();
  const baseTime = String(hours).padStart(2, "0") + "00";

  return { baseDate, baseTime };
};

const parseSkyCondition = (skyValue: string | number): string => {
  const sky = typeof skyValue === "string" ? Number(skyValue) : skyValue;
  if (sky === 1) return "맑음";
  if (sky === 3) return "구름 많음";
  if (sky === 4) return "흐림";
  return "흐림";
};

const parsePrecipitationType = (ptyValue: string | number): string => {
  const pty = typeof ptyValue === "string" ? Number(ptyValue) : ptyValue;
  if (pty === 1) return "비";
  if (pty === 2) return "비/눈";
  if (pty === 3) return "눈";
  if (pty === 4) return "소나기";
  return "없음";
};

const mapWindSpeedDescription = (windSpeed: number): string => {
  if (windSpeed < 2) return "약함";
  if (windSpeed < 4) return "약간 강함";
  return "강함";
};

const mapPrecipitationProbability = (popValue: string | number): number => {
  const pop = typeof popValue === "string" ? Number(popValue) : popValue;
  return Math.min(100, Math.max(0, pop));
};


interface ApiItem {
  category: string;
  obsrValue: string;
}

interface KmaWeatherItem {
  category: string;
  obsrValue: string;
}

interface KmaApiResponse {
  response: {
    body: {
      items: {
        item: KmaWeatherItem[];
      };
    };
  };
}
const parseWeatherItems = (items: ApiItem[]): Omit<WeatherData, "city"> => {
  let temp = 22;
  let sky = "1";
  let pty = "0";
  let pop = "0";
  let windSpeed = 1.5;

  for (const item of items) {
    if (item.category === "T1H") temp = Number(item.obsrValue);
    if (item.category === "SKY") sky = item.obsrValue;
    if (item.category === "PTY") pty = item.obsrValue;
    if (item.category === "POP") pop = item.obsrValue;
    if (item.category === "WSD") windSpeed = Number(item.obsrValue);
  }

  const condition =
    Number(pty) === 0 ? parseSkyCondition(sky) : parsePrecipitationType(pty);

  return {
    temp: Math.round(temp),
    feelsLike: Math.round(temp - windSpeed * 0.5),
    precipitation: mapPrecipitationProbability(pop),
    condition,
    wind: mapWindSpeedDescription(windSpeed),
    airQuality: "보통",
  };
};

export const fetchKmaWeather = async (
  location: string
): Promise<WeatherData> => {
  const serviceKey = process.env.KMA_SERVICE_KEY;
  if (!serviceKey) {
    throw new Error("KMA_SERVICE_KEY 환경 변수가 설정되지 않았습니다.");
  }

  const grid = getGridCoordinates(location);
  const { baseDate, baseTime } = getBaseDateTime();

  const url = new URL(
    "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"
  );
  url.searchParams.set("serviceKey", serviceKey);
  url.searchParams.set("numOfRows", "1000");
  url.searchParams.set("pageNo", "1");
  url.searchParams.set("dataType", "JSON");
  url.searchParams.set("base_date", baseDate);
  url.searchParams.set("base_time", baseTime);
  url.searchParams.set("nx", String(grid.nx));
  url.searchParams.set("ny", String(grid.ny));

  const response = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error(
      `기상청 API 호출 실패: ${response.status} ${response.statusText}`
    );
  }

  const body = (await response.json()) as KmaApiResponse;
  const items = body?.response?.body?.items?.item;
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("기상청 API 응답에서 데이터를 찾을 수 없습니다.");
  }

  const weather = parseWeatherItems(
    items.map((item: KmaWeatherItem) => ({
      category: item.category,
      obsrValue: item.obsrValue,
    }))
  );

  return {
    ...weather,
    city: location,
  };
};
