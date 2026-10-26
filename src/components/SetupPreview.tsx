export default function SetupPreview() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="text-sm font-medium tracking-widest text-slate-600">Ao / Portfolio</p>
      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">開発環境の準備ができました</h1>
      <p className="mt-6 leading-8 text-slate-700">
        TypeScript・React・Tailwind CSSで作成し、静的HTMLとして出力するための確認画面です。
      </p>
      <section className="mt-10 rounded-lg border border-slate-300 p-6" aria-labelledby="next-step">
        <h2 id="next-step" className="text-lg font-semibold">次の工程</h2>
        <p className="mt-3 leading-7 text-slate-700">共通ヘッダー・フッターと、各ページの骨組みを作成します。</p>
      </section>
    </main>
  );
}
