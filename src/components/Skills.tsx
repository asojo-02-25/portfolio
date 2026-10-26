import { SkillList } from './Elements';
import { usedSkills, touchedSkills, otherSkills } from '../data/portfolio';
export default function Skills() {
  return (
    <div className="skill-groups">
      <section className="skill-group">
        <h2>Used in Projects</h2>
        <SkillList skills={usedSkills} />
      </section>
      <section className="skill-group">
        <h2>Explored</h2>
        <SkillList skills={touchedSkills} />
      </section>
      <section className="skill-group">
        <h2>Tools & Platforms</h2>
        <SkillList skills={otherSkills} />
      </section>
    </div>
  );
}
