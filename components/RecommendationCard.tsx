import type { RecommendationResult } from "@/types";
import OutfitImageCard from "@/components/OutfitImageCard";

interface RecommendationCardProps {
  recommendation: RecommendationResult;
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const displayedOutfits = recommendation.outfitItems.slice(0, 3);

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            오늘의 추천 컬러
          </p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-900">
            {recommendation.dayColor}
          </h3>
        </div>
        <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
          {recommendation.summary}
        </div>
      </div>

      {displayedOutfits.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayedOutfits.map((outfit) => (
            <OutfitImageCard
              key={outfit.id}
              outfit={outfit}
              dayColor={recommendation.dayColor}
            />
          ))}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-700">추천 코디</p>
          <ul className="mt-3 space-y-2 text-slate-800">
            {recommendation.outfitItems.map((item) => (
              <li
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-700">핏 & 스타일</p>
          <p className="mt-3 text-sm text-slate-800">{recommendation.fitAdvice}</p>
          <div className="mt-4 space-y-2 text-xs text-slate-600">
            {recommendation.weatherHighlights.map((highlight, idx) => (
              <p key={idx}>{highlight}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
