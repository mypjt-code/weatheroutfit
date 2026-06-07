"use client";

import { useMemo, useState } from "react";
import PurposeSelector from "@/components/PurposeSelector";
import RecommendationCard from "@/components/RecommendationCard";
import ShoppingLinks from "@/components/ShoppingLinks";
import UserProfileForm from "@/components/UserProfileForm";
import WeatherCard from "@/components/WeatherCard";
import { mockWeatherData } from "@/lib/mockWeather";
import { recommendOutfit } from "@/lib/recommendOutfit";
import type { Purpose, RecommendationResult, WeatherData } from "@/types";

const purposeOptions: Purpose[] = [
  "출근",
  "데이트",
  "육아/등하원",
  "운동",
  "산책",
  "격식 있는 자리",
  "여행",
];

export default function Home() {
  const [location, setLocation] = useState("판교");
  const [selectedPurpose, setSelectedPurpose] = useState<Purpose>("출근");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [weather, setWeather] = useState<WeatherData>(mockWeatherData);
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const displayWeather = useMemo(
    () => ({
      ...weather,
      city: location.trim() || weather.city,
    }),
    [location, weather]
  );

  const handleRecommend = async () => {
    setIsLoading(true);
    setApiError(null);

    const numericHeight = Number(height);
    const numericWeight = Number(weight);

    try {
      const locationInput = location.trim() || "판교";
      const response = await fetch(`/api/weather?location=${encodeURIComponent(locationInput)}`);
      const fetchedWeather = await response.json();

      setWeather(fetchedWeather);

      if (fetchedWeather.source !== "kma") {
        setApiError("기상청 API 연결에 문제가 발생했거나 지원하지 않는 지역입니다. 모의 데이터로 추천합니다.");
      }

      setRecommendation(
        recommendOutfit(
          fetchedWeather,
          selectedPurpose,
          height.trim() !== "" && Number.isFinite(numericHeight) ? numericHeight : undefined,
          weight.trim() !== "" && Number.isFinite(numericWeight) ? numericWeight : undefined
        )
      );
    } catch (error) {
      console.error("Recommend error:", error);
      setApiError("기상청 API 연결에 문제가 발생했습니다. 모의 데이터로 추천을 제공합니다.");
      const fallbackWeather: WeatherData = {
        ...mockWeatherData,
        city: location.trim() || mockWeatherData.city,
      };
      setRecommendation(
        recommendOutfit(
          fallbackWeather,
          selectedPurpose,
          height.trim() !== "" && Number.isFinite(numericHeight) ? numericHeight : undefined,
          weight.trim() !== "" && Number.isFinite(numericWeight) ? numericWeight : undefined
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Weather Outfit
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              오늘 날씨에 맞는 옷차림을 추천해드려요.
            </h1>
            <p className="text-base leading-7 text-slate-600">
              현재 위치 또는 입력한 지역의 날씨를 기반으로 외출 목적, 키와 몸무게를
              반영한 코디 추천을 받아보세요.
            </p>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">나만의 정보 입력</h2>
              <p className="mt-2 text-sm text-slate-600">
                위치와 체형 정보를 입력하면 보다 자연스러운 추천 문구가 추가됩니다.
              </p>
              <div className="mt-6">
                <UserProfileForm
                  location={location}
                  height={height}
                  weight={weight}
                  onChangeLocation={setLocation}
                  onChangeHeight={setHeight}
                  onChangeWeight={setWeight}
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <PurposeSelector
                choices={purposeOptions}
                selectedPurpose={selectedPurpose}
                onSelectPurpose={setSelectedPurpose}
              />
            </div>

            <button
              type="button"
              onClick={handleRecommend}
              disabled={isLoading}
              className="w-full rounded-full bg-slate-900 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isLoading ? "실시간 날씨 불러오는 중..." : "추천 받기"}
            </button>
            {apiError && (
              <p className="mt-3 text-sm text-red-600">{apiError}</p>
            )}
          </div>

          <div className="space-y-6">
            <WeatherCard weather={displayWeather} />
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">추천 안내</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                기상청 API와 연결하여 실제 날씨 정보를 가져옵니다. 응답이 없을 경우에는
                모의 데이터로도 코디를 추천해드립니다.
              </p>
            </div>
          </div>
        </div>

        {recommendation && (
          <div className="space-y-6">
            <RecommendationCard recommendation={recommendation} />
            <ShoppingLinks items={recommendation.shoppingItems} />
          </div>
        )}
      </div>
    </main>
  );
}