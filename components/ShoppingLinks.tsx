import type { ShoppingItem } from "@/types";

interface ShoppingLinksProps {
  items: ShoppingItem[];
}

export default function ShoppingLinks({ items }: ShoppingLinksProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">추천 아이템 쇼핑 링크</h3>
      <div className="mt-5 space-y-4">
        {items.map(({ item, links }) => (
          <div key={item} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
            <p className="font-semibold text-slate-800">{item}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-700">
              <a href={links.naver} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-100">
                네이버쇼핑
              </a>
              <a href={links.musinsa} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-100">
                무신사
              </a>
              <a href={links.coupang} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-100">
                쿠팡
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
