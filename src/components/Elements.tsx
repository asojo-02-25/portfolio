import type { ReactNode } from 'react';
const skillIcons: Record<string, string> = {
  'C#': 'csharp',
  typescript: 'typescript',
  javascript: 'javascript',
  react: 'react',
  html: 'html5',
  css: 'css-new',
  vite: 'vite',
  vitest: 'vitest',
  'sql server': 'microsoft-sql-server',
  python: 'python',
  ruby: 'ruby',
  java: 'java',
  nextjs: 'next-js',
  canva: 'canva',
  git: 'git',
  github: 'github',
  codex: 'codex',
  notion: 'notion',
  obsidian: 'obsidian',
};
export function SkillList({
  skills,
  showLabels = true,
}: {
  skills: string[];
  showLabels?: boolean;
}) {
  return (
    <ul className={showLabels ? 'skill-list' : 'skill-list skill-list-icons'}>
      {skills.map((name) => (
        <li key={name}>
          <img
            className="skill-symbol"
            src={`${import.meta.env.BASE_URL}icons/svgl/${skillIcons[name]}.svg`}
            width="44"
            height="44"
            alt={showLabels ? '' : name}
            title={name}
            loading="lazy"
          />
          {showLabels && <span>{name}</span>}
        </li>
      ))}
    </ul>
  );
}
export function ProjectIcon() {
  return (
    <div className="project-art" aria-hidden="true">
      <div className="project-art-symbol">
        §<span>_</span>
      </div>
      <span className="project-art-name">law_typing</span>
      <span className="project-art-caption">LAW × TYPING</span>
    </div>
  );
}
export function CareerList({
  entries,
}: {
  entries: { date: string; title: string; detail?: string }[];
}) {
  return (
    <ol className="career-list">
      {entries.map((entry) => (
        <li key={entry.date}>
          <time dateTime={entry.date.replace('.', '-')}>{entry.date}</time>
          <div>
            <p className="career-title">{entry.title}</p>
            {entry.detail && <p className="career-detail">{entry.detail}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
export function OverviewCard({
  title,
  number,
  path,
  base,
  children,
}: {
  title: string;
  number: string;
  path: string;
  base: string;
  children: ReactNode;
}) {
  return (
    <section className="overview-card">
      <div className="card-heading">
        <span className="section-number">{number}</span>
        <h2>
          <a href={base + path + '/'}>
            {title}
            <span className="card-chevron" aria-hidden="true">
              ›
            </span>
          </a>
        </h2>
      </div>
      <div className="card-content">{children}</div>
    </section>
  );
}
