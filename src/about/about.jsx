import NavBar from '../naveBar/nav-bar';
import './about.css';

const participants = [
  'Max Beck',
  'Chen Yi Xue',
  'Daan Berg',
  'Francis Bogaard',
  'Reuben Confue',
  'Ben Field',
  'Thomas James',
  'Mick Labree',
  'Jakub Pazdan',
  'Delia Sofron',
  'Mobin Zaki',
  'Luxor Van Hage',
  'Maartje Van Rijn',
  'Demian Van Vugt',
  'Jabbagh Younes',
  'Cojan Alexandru',
];

export default function About() {
  return (
    <>
      <NavBar />
      <div className="about-container">
        <h1 className="about-title">Students Exchange</h1>
        <p className="about-text">
          Once upon a time, when the gods were ruling the skies and the people
          were conquering the lands and deep waters of the earth. An evil force
          raised. Tomasz Bergier The "Destroyer". He was going to destroy all the
          earthy realms. But from nowhere when the world was the darkest and
          hopeless. A horn sound tumbled across the skies. It was the call of the
          Warriors. The fighters of the City College Plymouth and Leiden
          University raised their heads. Their distance was great but the
          incredible swimming skills of the Leiden Students, helped them to cross
          the Tremendous Sea. Once arrived in Plymouth the soldiers gathered at
          the great hall of City College Plymouth. There, they were welcomed by
          City College students. After the great feast, each warrior introduced
          themselves. After the introduction of the warriors, supreme decision,
          and opinion has been whispered. At the end of the discussion, two new
          leaders were born that day. They will lead the warrior in the darkness
          ahead and will maintain the army together by assigning tasks in The
          Scrolls Of The Conquerors (Trello). Once the plan to satisfy Tomasz
          Bergier was made. The warriors were ready to prepare. The army was
          split into smaller teams for efficiency.
        </p>
        <h2 className="about-subheading">Participants In The Project</h2>
        <ul className="about-participants">
          {participants.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <p className="about-copyright">&copy; Leiden 2023</p>
      </div>
    </>
  );
}
