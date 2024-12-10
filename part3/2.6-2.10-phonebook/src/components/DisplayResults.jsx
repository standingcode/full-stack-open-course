const DisplayResults = ({ persons }) => {
  return persons.map((person) => (
    <DisplaySingleResult person={person} key={person.id} />
  ));
};

const DisplaySingleResult = ({ person }) => {
  return (
    <div key={person.name}>
      {person.name} {person.number}
    </div>
  );
};

export default DisplayResults;
