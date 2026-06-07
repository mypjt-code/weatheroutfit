import type { WeatherData } from "@/types";

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            오늘의 날씨
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            {weather.city}
          </h3>
        </div>
        <span className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          {weather.condition}
        </span>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            기온
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            {weather.temp}°C
          </p>
          <p className="text-sm text-slate-500">체감 {weather.feelsLike}°C</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            강수확률
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            {weather.precipitation}%
          </p>
          <p className="text-sm text-slate-500">미세먼지 {weather.airQuality}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            바람 세기
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            {weather.wind}
          </p>
          <p className="text-sm text-slate-500">오늘의 기분 있는 한 줄</p>
        </div>
      </div>
    </div>
  );
}
