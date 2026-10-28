# portfolio

Aoのポートフォリオサイト。TypeScript・React・Tailwind CSSを使用し、Astroで静的HTMLを生成する。

## 開発環境

- Node.js 22.23.4以上（初期構築の確認環境: Node.js 24.18.0 / npm 11.16.0）
- パッケージ管理: npm。依存関係は `package-lock.json` で固定する。

```sh
npm ci
npm run dev
```

起動後、ターミナルに表示されるURLを開く。GitHub Pagesの公開パスに合わせ、トップは `http://localhost:4321/portfolio/`。

## チェック・ビルド

```sh
npm run check
npm run build
npm run preview
```

`build` は型チェックの後、`dist/` に静的ファイルを出力する。Reactコンポーネントはビルド時にHTMLへ変換し、操作が必要になるまではブラウザ用JavaScriptを追加しない。

## 構成

- `src/pages/`: URLに対応するページとHTMLメタデータ
- `src/components/`: Reactの画面部品
- `src/styles/global.css`: Tailwind CSSと基本スタイル
- `astro.config.mjs`: 静的出力、React、Tailwind CSS、公開URLの設定

工程4まで実装済み。トップ・経歴・プロジェクト・記事・スキルの5ページをスマートフォン・PCで表示できる。記事は「準備中」。

掲載原稿は `src/data/portfolio.ts`、画面部品は `src/components/`、色と画面幅ごとの配置は `src/styles/global.css` で管理する。技術アイコンはSVGLのSVGを `public/icons/svgl/` に保存して使用する（同フォルダーに取得元・ライセンスを収録）。トップはアイコンのみ、スキルページはアイコンと技術名を3分類で表示する。プロジェクト画像は提供されたlaw_typingのスクリーンショット4枚を使用し、トップとProjectsで自動・手動スクロール可能なループギャラリーとして表示する。画像は `public/images/law-typing/`、挙動は `src/components/ProjectGallery.tsx` で管理する。

```sh
npm run format
npm run format:check
```

コード整形にはPrettierとAstro用プラグインを使用する。外部記事取得・OGP画像の作成は後続工程。

## 公開方針

GitHub Pagesを採用。公開URLは https://asojo-02-25.github.io/portfolio/ 。

`astro.config.mjs` の `site` と `base` を公開先に合わせて設定している。内部リンクと公開素材は `import.meta.env.BASE_URL` を使って組み立て、`/portfolio/` 配下で動作するようにする。

GitHub PagesのSourceはGitHub Actionsを使用する。`.github/workflows/deploy.yml` がmainへのpush時にNode.js 24で依存関係を導入し、`npm run build`で型チェックと静的ビルドを実行して、`dist/`を公開する。Actions画面から手動実行も可能。

更新時は原稿・画像・スタイルを変更し、`npm run build`で確認後、コミットしてmainへpushする。GitHub Actionsの「Deploy to GitHub Pages」が成功したら、公開URLで変更を確認する。記事取得・OGP画像は工程5の残件。

## 開発ドキュメント

- [要件定義書](docs/requirements.md)
- [実装計画](docs/implementation-plan.md)
- [画面構成（draw.io）](wireframes/top.drawio)
