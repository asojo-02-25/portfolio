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

現在は工程1の動作確認用ページのみ。掲載原稿や実際の画面は工程2以降に実装する。

## 公開方針

GitHub Pagesを採用。想定公開URLは `https://asojo-02-25.github.io/portfolio/`。まだ公開していない。

`astro.config.mjs` の `site` と `base` を公開先に合わせて設定している。内部リンクと公開素材は `import.meta.env.BASE_URL` を使って組み立て、`/portfolio/` 配下で動作するようにする。

公開ワークフローとGitHub Pagesの有効化は工程6で行う。原稿のデータ化は工程3、記事取得・OGP画像は工程5で追加し、更新手順を追記する。

## 開発ドキュメント

- [要件定義書](docs/requirements.md)
- [実装計画](docs/implementation-plan.md)
- [画面構成（draw.io）](wireframes/top.drawio)
