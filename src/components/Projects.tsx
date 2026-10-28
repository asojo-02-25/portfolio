import ProjectGallery from './ProjectGallery';
import { project } from '../data/portfolio';
export default function Projects() {
  return (
    <article className="project-detail">
      <ProjectGallery />
      <div>
        <h2 className="detail-heading">{project.name}</h2>
        <p className="detail-copy">{project.description}</p>
        <div className="project-links">
          <a href={project.source}>
            Source Code <span aria-hidden="true">↗</span>
          </a>
          <a href={project.url}>
            Visit Website <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
