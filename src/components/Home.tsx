import { introduction, careers, usedSkills } from '../data/portfolio';
import { OverviewCard, CareerList, SkillList } from './Elements';
import ProjectGallery from './ProjectGallery';
export default function Home({ base }: { base: string }) {
  return (
    <>
      <div className="intro">
        <h1>
          Ao<span aria-hidden="true">.</span>
        </h1>
        <p className="intro-text">{introduction}</p>
      </div>
      <div className="overview-list">
        <OverviewCard number="01" title="Profile" path="career" base={base}>
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
        <OverviewCard number="02" title="Projects" path="projects" base={base}>
          <p className="card-intro">
            司法試験受験生向けのタイピング練習サイトを公開しています。
          </p>
          <ProjectGallery withinLink />
        </OverviewCard>
        <OverviewCard number="03" title="Articles" path="articles" base={base}>
          <p className="card-intro">技術や経験、学習したことなど。</p>
          <p className="empty-inline">
            <span aria-hidden="true">✎</span> Coming Soon
          </p>
        </OverviewCard>
        <OverviewCard number="04" title="Skills" path="skills" base={base}>
          <p className="card-intro">
            Webアプリまわりの技術を中心に育てていきたいと思っています。
          </p>
          <SkillList skills={usedSkills} showLabels={false} />
        </OverviewCard>
      </div>
    </>
  );
}
