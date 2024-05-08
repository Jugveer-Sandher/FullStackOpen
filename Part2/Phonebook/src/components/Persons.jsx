const Person = ({ id, name, phone }) => {
    return (
      <div>
        <h5>{name} {phone}</h5> 
      </div>
    )
}

const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <div>
      {filteredPersons.map(person => (
        <div key={person.id} style={{ display: 'flex', alignItems: 'center' }}>
          <Person 
            key={person.id}
            name={person.name} 
            phone={person.phone}
          />
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};


export default Persons
