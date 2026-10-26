import { introduction, careers, usedSkills } from '../data/portfolio';
import { OverviewCard, CareerList, ProjectIcon, SkillList } from './Elements';
export default function Home({ base }: { base: string }) {
  return (
    <>
      <div className="intro">
        <p className="eyebrow">HELLO, I'M</p>
        <h1>
          Ao<span aria-hidden="true">.</span>
        </h1>
        <p className="intro-text">{introduction}</p>
      </div>
      <div className="overview-list">
        <OverviewCard number="01" title="経歴" path="career" base={base}>
          <p className="card-intro">
            歴は浅いですが、その分日々学習に励んでいます。
          </p>
          <CareerList
            entries={[careers[0], careers[4]].map(({ date, title }) => ({
              date,
              title,
            }))}
          />
        </OverviewCard>
        <OverviewCard
          number="02"
          title="プロジェクト"
          path="projects"
          base={base}
        >
          <p className="card-intro">
            司法試験受験生向けのタイピング練習サイトを公開しています。
          </p>
          <ProjectIcon />
        </OverviewCard>
        <OverviewCard number="03" title="記事" path="articles" base={base}>
          <p className="card-intro">技術や経験、学習したことなど。</p>
          <p className="empty-inline">
            <span aria-hidden="true">✎</span> 準備中
          </p>
        </OverviewCard>
        <OverviewCard number="04" title="スキル" path="skills" base={base}>
          <p className="card-intro">
            webアプリまわりの技術を中心に育てていきたいと思っています。
          </p>
          <SkillList skills={usedSkills} showLabels={false} />
        </OverviewCard>
      </div>
    </>
  );
}
