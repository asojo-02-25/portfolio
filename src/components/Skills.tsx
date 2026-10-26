import { SkillList } from './Elements';
import { usedSkills, touchedSkills, otherSkills } from '../data/portfolio';
export default function Skills() {
  return (
    <div className="skill-groups">
      <section className="skill-group">
        <h2>学習し開発で使用した経験がある</h2>
        <SkillList skills={usedSkills} />
      </section>
      <section className="skill-group">
        <h2>触ったことがある</h2>
        <SkillList skills={touchedSkills} />
      </section>
      <section className="skill-group">
        <h2>その他</h2>
        <SkillList skills={otherSkills} />
      </section>
    </div>
  );
}
