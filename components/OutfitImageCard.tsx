import type { OutfitItem } from "@/types";

interface OutfitImageCardProps {
  outfit: OutfitItem;
  dayColor: string;
}

export default function OutfitImageCard({ outfit, dayColor }: OutfitImageCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <p className="text-4xl">{outfit.description.charAt(0) === "추" ? "👕" : "🧥"}</p>
          <p className="text-xs font-medium text-slate-600">{outfit.name}</p>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="font-semibold text-slate-900">{outfit.name}</h3>
          <p className="mt-1 text-sm text-slate-600">{outfit.description}</p>
        </div>
        <div className="text-xs text-slate-500">
          <span className="inline-block rounded-full bg-slate-100 px-2 py-1">
            추천 컬러: {dayColor}
          </span>
        </div>
        <div className="flex gap-2">
          <a
            href={outfit.links.naver}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
          >
            네이버
          </a>
          <a
            href={outfit.links.musinsa}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
          >
            무신사
          </a>
          <a
            href={outfit.links.coupang}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
          >
            쿠팡
          </a>
        </div>
      </div>
    </div>
  );
}
