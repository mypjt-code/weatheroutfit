interface UserProfileFormProps {
  location: string;
  height: string;
  weight: string;
  onChangeLocation: (value: string) => void;
  onChangeHeight: (value: string) => void;
  onChangeWeight: (value: string) => void;
}

export default function UserProfileForm({
  location,
  height,
  weight,
  onChangeLocation,
  onChangeHeight,
  onChangeWeight,
}: UserProfileFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          지역 입력
        </label>
        <input
          value={location}
          onChange={(event) => onChangeLocation(event.target.value)}
          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          placeholder="예: 판교"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            키 (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(event) => onChangeHeight(event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            placeholder="160"
            min={100}
            max={220}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            몸무게 (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(event) => onChangeWeight(event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            placeholder="60"
            min={30}
            max={150}
          />
        </div>
      </div>
    </div>
  );
}
