import { supabase } from "@/lib/supabase";

type Tmp = {
  seq: number;
  content: string | null;
  reg_dt: string | null;
};

export default async function Home() {
  const { data, error } = await supabase
    .from("tmp")
    .select("seq, content, reg_dt")
    .order("seq", { ascending: false });

  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">TMP 조회 오류</h1>
        <p className="mt-4 text-red-500">{error.message}</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">TMP 테이블 조회</h1>

      <div className="mt-6 space-y-3">
        {data?.map((item: Tmp) => (
          <div key={item.seq} className="rounded-lg border p-4">
            <p>seq: {item.seq}</p>
            <p>content: {item.content}</p>
            <p>reg_dt: {item.reg_dt}</p>
          </div>
        ))}
      </div>
    </main>
  );
}