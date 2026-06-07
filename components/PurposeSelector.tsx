import type { Purpose } from "@/types";

interface PurposeSelectorProps {
  choices: Purpose[];
  selectedPurpose: Purpose;
  onSelectPurpose: (purpose: Purpose) => void;
}

export default function PurposeSelector({
  choices,
  selectedPurpose,
  onSelectPurpose,
}: PurposeSelectorProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-900">외출 목적 선택</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {choices.map((purpose) => {
          const isActive = purpose === selectedPurpose;
          return (
            <button
              key={purpose}
              type="button"
              onClick={() => onSelectPurpose(purpose)}
              className={`rounded-2xl border px-4 py-3 text-sm transition hover:border-slate-400 hover:bg-slate-50 ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              {purpose}
            </button>
          );
        })}
      </div>
    </div>
  );
}
