import type { ReactNode } from 'react';
const skillIcons: Record<string, string> = {
  'C#': 'csharp',
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  React: 'react',
  HTML: 'html5',
  CSS: 'css-new',
  Vite: 'vite',
  Vitest: 'vitest',
  'SQL Server': 'microsoft-sql-server',
  Python: 'python',
  Ruby: 'ruby',
  Java: 'java',
  'Node.js': 'node-js',
  Canva: 'canva',
  Git: 'git',
  GitHub: 'github',
  Codex: 'codex',
  Notion: 'notion',
  Obsidian: 'obsidian',
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
    <a
      className="overview-card"
      href={base + path + '/'}
      aria-label={title}
      draggable={false}
    >
      <div className="card-heading">
        <span className="section-number">{number}</span>
        <h2>
          {title}
          <span className="card-chevron" aria-hidden="true">
            ›
          </span>
        </h2>
      </div>
      <div className="card-content">{children}</div>
    </a>
  );
}
