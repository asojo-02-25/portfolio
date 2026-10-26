import { CareerList } from './Elements';
import { careers } from '../data/portfolio';
export default function Career() {
  return <div className="detail-career"><CareerList entries={careers} /></div>;
}
